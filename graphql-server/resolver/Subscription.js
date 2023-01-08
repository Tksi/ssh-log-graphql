import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const Subscription = {
  log: {
    subscribe: () => pubsub.asyncIterator(['LOG']),
  },
};
