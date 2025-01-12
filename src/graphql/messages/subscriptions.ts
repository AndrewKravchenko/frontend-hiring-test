import { gql } from "@apollo/client";
import { MESSAGE_FIELDS_FRAGMENT } from "./fragments";

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  ${MESSAGE_FIELDS_FRAGMENT}

  subscription OnMessageAdded {
    messageAdded {
      ...MessageFieldsFragment
    }
  }
`;

export const MESSAGE_UPDATED_SUBSCRIPTION = gql`
  ${MESSAGE_FIELDS_FRAGMENT}

  subscription OnMessageUpdated {
    messageUpdated {
      ...MessageFieldsFragment
    }
  }
`;
