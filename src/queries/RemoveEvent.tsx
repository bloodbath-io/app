import { gql } from '@apollo/client';

export const MUTATION_REMOVE_EVENT = gql`
  mutation removeEvent(
    $id: UUID4!
  ) {
    removeEvent(
      id: $id
    ) {
      id
    }
  }
`;
