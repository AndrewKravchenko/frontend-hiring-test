import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, MESSAGE_ADDED_SUBSCRIPTION, MESSAGE_UPDATED_SUBSCRIPTION } from "../graphql";
import type {
  MessageEdge,
  MessagePage,
  Query,
  QueryMessagesArgs,
  Subscription,
} from "../../__generated__/resolvers-types.ts";

const MESSAGES_PER_PAGE = 20;

export const useChat = () => {
  const { data, fetchMore } = useQuery<Query, QueryMessagesArgs>(GET_MESSAGES, {
    variables: { first: MESSAGES_PER_PAGE },
  });

  useSubscription<Subscription>(MESSAGE_ADDED_SUBSCRIPTION, {
    onData: function ({ client, data }) {
      const cache = client.cache;
      const newMessage = data.data?.messageAdded;

      if (!newMessage) {
        return;
      }

      const cachedMessagesData = cache.readQuery<Query>({
        query: GET_MESSAGES,
        variables: { first: MESSAGES_PER_PAGE },
      });

      if (!cachedMessagesData) {
        return;
      }

      const isMessageAlreadyCached = cachedMessagesData.messages.edges.some(
        ({ node }) => node.id === newMessage.id
      );

      if (isMessageAlreadyCached) {
        return;
      }

      const newEdge: MessageEdge = {
        node: newMessage,
        cursor: newMessage.id,
        __typename: "MessageEdge",
      };

      const updatedMessages: MessagePage = {
        ...cachedMessagesData.messages,
        edges: [...cachedMessagesData.messages.edges, newEdge,],
      };

      cache.writeQuery({
        query: GET_MESSAGES,
        variables: { first: MESSAGES_PER_PAGE },
        data: {
          messages: updatedMessages,
        },
      });
    },
  });

  useSubscription<Subscription>(MESSAGE_UPDATED_SUBSCRIPTION, {
    onData({ client, data }) {
      const cache = client.cache;
      const updatedMessage = data.data?.messageUpdated;

      if (!updatedMessage) return;

      cache.modify({
        id: cache.identify({
          __typename: "Message",
          id: updatedMessage.id,
        }),
        fields: {
          status: () => updatedMessage.status,
          updatedAt: () => updatedMessage.updatedAt,
        },
      });
    },
  })

  const messagesData = data?.messages;
  const messages = messagesData?.edges.map(({ node }) => node) || [];

  const loadMore = () => {
    if (!messagesData?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: { after: messagesData.pageInfo.endCursor, first: MESSAGES_PER_PAGE, },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          ...previousResult,
          messages: {
            ...fetchMoreResult.messages,
            edges: [
              ...previousResult.messages.edges,
              ...fetchMoreResult.messages.edges,
            ],
          },
        };
      },
    });
  };

  return {
    messages,
    loadMore,
  };
};
