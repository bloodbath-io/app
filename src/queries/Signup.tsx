import { gql } from '@apollo/client';

export const MUTATION_SIGNUP = gql`
  mutation signup(
    $email: String!
    $firstName: String!
    $lastName: String!
    $organizationInput: OrganizationInput!
    $password: String!
  ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      organization: $organizationInput
      password: $password
    ) {
      id
      apiKey
    }
  }
`;
