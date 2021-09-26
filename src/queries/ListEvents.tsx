import { gql } from '@apollo/client';

export const QUERY_LIST_EVENTS = gql`
  query listEvents {
    listEvents(first: 100) {
      pageInfo {
        startCursor
      }
      edges {
        node {
        id
        eventId
        method
        lockedAt
        }
      }
    }
  }
`
