import { schema } from '../../graphql/schema/index';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { context } from '../../graphql/schema/context';

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: ({ req }) => context(req),
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
