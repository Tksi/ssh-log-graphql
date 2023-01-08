import { logLineParser } from '../lib/logLineParser.js';
import { fetchGeojs } from '../lib/fetchGeojs.js';
import { pubsub } from './Subscription.js';

export const Mutation = {
  addDB: async (_, { logLine, logType }, { AuthLogCollection }) => {
    // envにフラグがある場合弾く
    if (process.env.DENY_WRITE_TO_DB == 'true')
      return new Error('DENY_WRITE_TO_DB');

    const parsedLog = logLineParser({ logLine, logType });
    if (parsedLog instanceof Error) return parsedLog;

    const obj = {
      ...parsedLog,
      date: new Date(parsedLog.unixtime * 1000 + parsedLog.usec / 1000),
      ...(await fetchGeojs({ ip: parsedLog.ip })),
    };

    const { acknowledged } = await AuthLogCollection.insertOne(obj);

    if (acknowledged) {
      pubsub.publish('LOG', { log: obj });
      return obj;
    }
    return new Error('DB insert Error');
  },
};
