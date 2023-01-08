import { gql } from 'graphql-request';
import { assertGraphql } from './lib/assertGraphql.js';

describe('authLogCity', () => {
  it('range:{from:"2021/11/29,to:"2021/11/29 0:10"}', async () => {
    await assertGraphql(
      gql`
        query {
          authLogCity(range: { from: "2021/11/29", to: "2021/11/29 0:10" }) {
            city
            country {
              continentCode
              country
              countryCode
              countryCode3
            }
            ipList {
              ip
            }
            range {
              from
              to
            }
          }
        }
      `,
      {
        data: {
          authLogCity: [
            {
              city: 'Bengaluru',
              country: {
                continentCode: 'AS',
                country: 'India',
                countryCode: 'IN',
                countryCode3: 'IND',
              },
              ipList: [
                {
                  ip: '159.65.150.106',
                },
              ],
              range: {
                from: '2021/11/29',
                to: '2021/11/29 0:10',
              },
            },
            {
              city: 'Hangzhou',
              country: {
                continentCode: 'AS',
                country: 'China',
                countryCode: 'CN',
                countryCode3: 'CHN',
              },
              ipList: [
                {
                  ip: '124.160.96.249',
                },
              ],
              range: {
                from: '2021/11/29',
                to: '2021/11/29 0:10',
              },
            },
          ],
        },
      }
    );
  });
});
