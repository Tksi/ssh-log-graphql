import { range2filter } from '../lib/dateParser.js';

export const AuthLogCity = {
  country: async (parent, _, { AuthLogCollection }) => {
    if (parent.city === null) return null;

    const res = await AuthLogCollection.findOne(
      { $and: [range2filter(parent.range), { city: parent.city }] },
      {
        projection: {
          _id: 0,
          country: 1,
          continentCode: 1,
          countryCode: 1,
          countryCode3: 1,
        },
      }
    );

    return { ...res, range: parent.range };
  },

  ipList: async (parent, _, { AuthLogCollection }) => {
    if (parent.city === null) return [];

    const $group = {
      _id: '$ip',
      port: { $addToSet: '$port' },
      country: { $first: '$country' },
      user: { $addToSet: '$user' },
      password: { $addToSet: '$password' },
      asn: { $first: '$asn' },
    };

    const res = await AuthLogCollection.aggregate(
      [
        { $match: range2filter(parent.range) },
        { $match: { city: { $eq: parent.city } } },
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
            asn: 1,
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
