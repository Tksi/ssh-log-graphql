import { range2filter } from '../lib/dateParser.js';

export const AuthLogOrg = {
  organizationName: async (parent) => {
    return parent[0].organizationName;
  },

  userList: async (parent, _, { AuthLogCollection }) => {
    const res = await AuthLogCollection.distinct('user', {
      $and: [
        range2filter(parent[0].range),
        { organizationName: parent[0].organizationName },
      ],
    });
    return res.sort();
  },

  passwordList: async (parent, _, { AuthLogCollection }) => {
    const res = await AuthLogCollection.distinct('password', {
      $and: [
        range2filter(parent[0].range),
        { organizationName: parent[0].organizationName },
      ],
    });

    return res.sort();
  },

  ipList: async (parent, _, { AuthLogCollection }) => {
    if (parent.city === null) return [];

    const $group = {
      _id: '$ip',
      port: { $addToSet: '$port' },
      country: { $first: '$country' },
      user: { $addToSet: '$user' },
      password: { $addToSet: '$password' },
    };

    const res = await AuthLogCollection.aggregate(
      [
        { $match: range2filter(parent[0].range) },
        { $match: { organizationName: { $eq: parent[0].organizationName } } },
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
    res.map((obj) => ({
      ...obj,
      port: obj.port.sort((a, b) => a - b),
      password: obj.password.sort(),
      user: obj.user.sort(),
    }));
    return res;
  },
};
