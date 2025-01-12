import { gql } from "@apollo/client";
import { MESSAGE_FIELDS_FRAGMENT } from "./fragments";

export const GET_MESSAGES = gql`
  ${MESSAGE_FIELDS_FRAGMENT}

  query Messages($first: Int, $after: MessagesCursor, $before: MessagesCursor) {
    messages(first: $first, after: $after, before: $before) {
      edges {
        node {
          ...MessageFieldsFragment
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
