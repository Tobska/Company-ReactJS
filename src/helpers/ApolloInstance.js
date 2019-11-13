import ApolloClient from 'apollo-boost'

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
    mutate: {
        errorPolicy: 'all'
    }
}

const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    defaultOptions
})

export default client