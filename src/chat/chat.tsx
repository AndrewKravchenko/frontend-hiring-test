import React from "react";
import { ChatList } from "./chat-list.tsx";
import { ChatInput } from "./chat-input.tsx";
import css from "./chat.module.css";

export const Chat: React.FC = () => (
  <div className={css.root}>
    <div className={css.container}>
      <ChatList/>
    </div>
    <ChatInput/>
  </div>
);
