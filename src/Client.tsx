import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const isProd = process.env.NODE_ENV !== "development"
const apiDomain = isProd ? "https://api.bloodbath.io" : "http://localhost:4000"
const graphqlEndpoint = `${apiDomain}/graphql/full`

export const httpLink = createHttpLink({
  uri: graphqlEndpoint,
})

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('apiKey');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

interface ClientProps {
  children: React.ReactNode
}

export const BloodbathApollo: React.FC<ClientProps> = ({ children }, ...rest) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}