import { gql } from "@apollo/client";
import { MESSAGE_FIELDS_FRAGMENT } from "./fragments";

export const SEND_MESSAGE = gql`
  ${MESSAGE_FIELDS_FRAGMENT}

  mutation SendMessage($text: String!) {
    sendMessage(text: $text) {
      ...MessageFieldsFragment
    }
  }
`;
