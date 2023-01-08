import { schemaReader, resolverReader } from './lib/graphqlReader.js';
import { MongoClient } from 'mongodb';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import expressPlayground from 'graphql-playground-middleware-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware/index.js';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import ip from 'ip';

const schema = makeExecutableSchema({
  typeDefs: schemaReader('./schema'),
  resolvers: await resolverReader('./resolver'),
});

const MongoDB = (
  await MongoClient.connect(
    process.env.DB ?? 'mongodb://localhost:27017/sshLogs',
    {
      useNewUrlParser: true,
    }
  )
).db();

const server = new ApolloServer({
  schema,
  context: {
    AuthLogCollection: MongoDB.collection('sshLog'),
  },
});

await server.start();
const app = express();
app.use(cors());
server.applyMiddleware({ app });

const PORT = process.env.PORT ?? '4000';

app.get('/', (_, res) => res.sendFile(`${process.cwd()}/index.html`));
app.get(
  '/playground',
  expressPlayground.default({
    endpoint: `/graphql`,
    subscriptionEndpoint:
      process.env.PLAYGROUND_WS_ENDPOINT ??
      `ws://${ip.address()}:${PORT}/graphql`,
  })
);
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

const httpServer = createServer(app);

//  webscoket server for subscription
SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: server.graphqlPath }
);

httpServer.listen(PORT, () => {
  console.info(`🚀 http://${ip.address()}:${PORT}`);
});
