import React from "react";
import { Virtuoso } from "react-virtuoso";
import { ChatItem } from "./chat-item.tsx";
import type { Message } from "../../__generated__/resolvers-types.ts";
import { useChat } from "../hooks";

import css from "./chat.module.css";

export const ChatList: React.FC = () => {
  const { messages, loadMore } = useChat()

  return (
    <Virtuoso<Message>
      className={css.list}
      data={messages}
      itemContent={(_, message) => <ChatItem key={message.id} {...message} />}
      endReached={loadMore}
    />
  );
};
