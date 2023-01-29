import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink ({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
    credentials: "cross-origin",
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;