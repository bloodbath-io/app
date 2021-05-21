import { gql } from '@apollo/client';

export const QUERY_GET_EVENT = gql`
  query getEvent(
    $id: UUID4!
  ) {
    getEvent(
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
