import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.pokeapi.co/v1beta2",
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
