import { gql } from '@apollo/client';

export const MUTATION_SIGNIN = gql`
  mutation signin(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    ) {
      apiKey
      organization {
        id
      }
    }
  }
`;
