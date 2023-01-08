import { range2filter } from '../lib/dateParser.js';

export const AuthLogIp = {
  city: async (parent, _, { AuthLogCollection }) => {
    const res = await AuthLogCollection.findOne(
      { $and: [range2filter(parent.range), { ip: parent.ip }] },
      { projection: { _id: 0, city: 1 } }
    );

    return { ...res, range: parent.range };
  },

  asn: async (parent) => {
    return { asn: parent.asn, range: parent.range };
  },

  authInfo: async (parent, _, { AuthLogCollection }) => {
    // rangeの時間範囲内のデータをとりだす
    return await AuthLogCollection.find(range2filter(parent.range)).toArray();
  },
};
