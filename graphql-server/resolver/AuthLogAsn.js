import { range2filter } from '../lib/dateParser.js';

export const AuthLogAsn = {
  organization: async (parent, _, { AuthLogCollection }) => {
    const res = await AuthLogCollection.distinct('organizationName', {
      $and: [range2filter(parent.range), { asn: parent.asn[0] }],
    });
    return res.map((organizationName) => ({
      organizationName,
      range: parent.range,
    }));
  },
};
