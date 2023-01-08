import { range2filter } from '../lib/dateParser.js';
import { graphqlInfo2mongoGroup } from '../lib/graphqlInfo2mongoGroup.js';

export const Query = {
  authLogs: async (_, { range }, { AuthLogCollection }) => {
    // rangeの時間範囲内のデータをとりだす
    return await AuthLogCollection.find(range2filter(range)).toArray();
  },

  authLogCount: async (_, { by, range }, { AuthLogCollection }, info) => {
    // 数え上げの基準(デフォルト:byに指定されたフィールド)
    let _id = `$${by}`;
    // countが大きい順
    let $sort = { count: -1 };

    switch (by) {
      case 'YEAR':
        _id = {
          $dateToString: {
            format: `%Y`,
            date: '$date',
            timezone: 'Asia/Tokyo',
          },
        };
        $sort = { _id: 1 };
        break;

      case 'MONTH':
        _id = {
          $dateToString: {
            format: `%Y-%m`,
            date: '$date',
            timezone: 'Asia/Tokyo',
          },
        };
        $sort = { _id: 1 };
        break;

      case 'DAY':
        _id = {
          $dateToString: {
            format: `%Y-%m-%d`,
            date: '$date',
            timezone: 'Asia/Tokyo',
          },
        };
        $sort = { _id: 1 };
        break;

      case 'HOUR':
        _id = {
          $dateToString: {
            format: `%Y-%m-%dT%H:00`,
            date: '$date',
            timezone: 'Asia/Tokyo',
          },
        };
        $sort = { _id: 1 };
    }

    const $group = graphqlInfo2mongoGroup({
      initGroup: { _id, count: { $sum: 1 } },
      rule: {
        // フィールド値 : groupオブジェクト
        rtt: { rtt: { $avg: '$rtt' } },
      },
      info,
    });

    return await AuthLogCollection.aggregate([
      { $match: range2filter(range) },
      { $group },
      { $sort },
    ]).toArray();
  },

  authLogIp: async (_, { range, sshdHost }, { AuthLogCollection }) => {
    const $group = {
      _id: '$ip',
      port: { $addToSet: '$port' },
      country: { $first: '$country' },
      user: { $addToSet: '$user' },
      asn: { $addToSet: '$asn' },
      password: { $addToSet: '$password' },
    };

    const res = await AuthLogCollection.aggregate(
      [
        { $match: range2filter(range) },
        { $match: { sshdHost: { $eq: sshdHost } } },
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
            range: range,
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray();
    return res.map((obj) => ({
      ...obj,
      port: obj.port.sort((a, b) => a - b),
      asn: obj.asn.sort((a, b) => a - b),
      password: obj.password.sort(),
      user: obj.user.sort(),
    }));
  },

  authLogCity: async (_, { range, sshdHost }, { AuthLogCollection }) => {
    const res = await AuthLogCollection.distinct('city', {
      $and: [range2filter(range), { sshdHost }],
    });

    return res.map((city) => ({ city, range }));
  },
};
