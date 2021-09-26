import { gql } from '@apollo/client';

export const QUERY_LIST_EVENTS = gql`
  query listEvents {
    listEvents(first: 100) {
      pageInfo {
        startCursor
      }
      edges {
        node {
          eventId
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
    }
  }
`
