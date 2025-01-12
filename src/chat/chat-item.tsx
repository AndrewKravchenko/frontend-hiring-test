import React from "react";
import cn from "clsx";
import type { Message } from "../../__generated__/resolvers-types.ts";
import css from "./chat.module.css";

export const ChatItem: React.FC<Message> = ({ text, sender }) => (
  <div className={css.item}>
    <div
      className={cn(
        css.message,
        sender === "Admin" ? css.out : css.in
      )}
    >
      {text}
    </div>
  </div>
);
