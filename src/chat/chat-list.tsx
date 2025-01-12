import React from "react";
import { Virtuoso } from "react-virtuoso";
import { ChatItem } from "./chat-item.tsx";
import { Message, MessageSender, MessageStatus } from "../../__generated__/resolvers-types.ts";

import css from "./chat.module.css";

export const ChatList: React.FC = () => {
  const temp_data: Message[] = Array.from(Array(30), (_, index) => ({
    id: String(index),
    text: `Message number ${index}`,
    status: MessageStatus.Read,
    updatedAt: new Date().toISOString(),
    sender: index % 2 ? MessageSender.Admin : MessageSender.Customer,
  }))

  return (
    <Virtuoso<Message>
      className={css.list}
      data={temp_data}
      itemContent={(_, message) => <ChatItem key={message.id} {...message} />}
    />
  );
};
