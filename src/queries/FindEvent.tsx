import { gql } from '@apollo/client';

export const QUERY_FIND_EVENT = gql`
  query findEvent(
    $id: UUID4!
  ) {
    findEvent(
      id: $id
    ) {
      id
      method
      headers
      body
      endpoint
      scheduledFor
      enqueuedAt
      lockedAt
      dispatchedAt
      insertedAt
      updatedAt
    }
  }
`
