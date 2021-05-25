import { gql } from '@apollo/client';

export const MUTATION_CANCEL_EVENT = gql`
  mutation cancelEvent(
    $id: UUID4!
  ) {
    cancelEvent(
      id: $id
    ) {
      id
    }
  }
`;
