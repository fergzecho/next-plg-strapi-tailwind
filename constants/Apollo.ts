import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink ({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
    credentials: "same-origin",
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

