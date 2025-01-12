import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import css from "./chat.module.css";
import { useMutation } from "@apollo/client";
import type { Mutation, MutationSendMessageArgs } from "../../__generated__/resolvers-types.ts";
import { SEND_MESSAGE } from "../graphql";

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [sendMessage, { loading: isSending }] = useMutation<Mutation, MutationSendMessageArgs>(SEND_MESSAGE);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessage("");

    try {
      await sendMessage({ variables: { text: trimmedMessage }, });
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessage(trimmedMessage);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className={css.footer}>
      <input
        type="text"
        disabled={isSending}
        className={css.textInput}
        placeholder="Message text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSendMessage} disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  );
};
