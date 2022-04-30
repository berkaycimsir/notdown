import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { prod } from '../lib/isProd';
import { getToken } from '../utils/token';
import { setContext } from '@apollo/client/link/context';

const getUri = (): string => {
  return (
    prod
      ? process.env.NEXT_PUBLIC_SERVER_PROD_URL
      : process.env.NEXT_PUBLIC_SERVER_LOCAL_URL
  ) as string;
};

const httpLink = createHttpLink({
  uri: getUri(),
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: true,
  cache: new InMemoryCache(),
});
