import { gql } from '@apollo/client';

export const QUERY_LIST_EVENTS = gql`
  query listEvents {
    listEvents {
      id
      method
      headers
      body
      endpoint
      scheduledFor
      enqueuedAt
      lockedAt
      dispatchedAt
    }
  }
`
