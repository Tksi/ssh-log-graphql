import { range2filter } from '../lib/dateParser.js';

export const AuthLogCountry = {
  ipList: async (parent, _, { AuthLogCollection }) => {
    if (parent.country === null) return [];

    const $group = {
      _id: '$ip',
      port: { $addToSet: '$port' },
      country: { $first: '$country' },
      user: { $addToSet: '$user' },
      password: { $addToSet: '$password' },
    };

    const res = await AuthLogCollection.aggregate(
      [
        { $match: range2filter(parent.range) },
        { $match: { country: { $eq: parent.country } } },
        { $group },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            ip: '$_id',
            port: 1,
            country: 1,
            user: 1,
            password: 1,
          },
        },
        {
          $addFields: {
            range: parent.range,
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray();

    return res;
  },
};
