import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1tgk6y08gzt01xjg6hjdkvj/master',
  cache: new InMemoryCache(),
})

export const authorizedApolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1tgk6y08gzt01xjg6hjdkvj/master',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})
