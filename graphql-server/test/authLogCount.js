import { gql } from 'graphql-request';
import { assertGraphql } from './lib/assertGraphql.js';

describe('authLogCount', () => {
  it('range: { from: "2021/11/29" }', async () => {
    await assertGraphql(
      gql`
        query {
          authLogCount(range: { from: "2021/11/29" }) {
            _id
            count
            ip
            organizationName
            countryCode
            country
            date
            rtt
            sshdHost
          }
        }
      `,
      {
        data: {
          authLogCount: [
            {
              _id: '2021-11-29',
              count: 3652,
              ip: '76.176.69.186',
              organizationName: 'TWC-20001-PACWEST',
              countryCode: 'US',
              country: 'United States',
              date: '2021/11/29 0:00:18',
              rtt: 4.450135037787514,
              sshdHost: 'example.com',
            },
          ],
        },
      }
    );
  });

  it('by: YEAR, range: { from: "2021/11/29" }', async () => {
    await assertGraphql(
      gql`
        query {
          authLogCount(by: YEAR, range: { from: "2021/11/29" }) {
            _id
            count
          }
        }
      `,
      {
        data: {
          authLogCount: [
            {
              _id: '2021',
              count: 3652,
            },
          ],
        },
      }
    );
  });
});
