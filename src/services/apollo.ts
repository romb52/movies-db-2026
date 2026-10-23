import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri:  "https://swapi-graphql.netlify.app/.netlify/functions/index",
    }),
    cache: new InMemoryCache(), 
})

export default apolloClient; 