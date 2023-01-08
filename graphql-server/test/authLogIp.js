import { gql } from 'graphql-request';
import { assertGraphql } from './lib/assertGraphql.js';

describe('authLogIp', () => {
  it('range:{from:"2021/11/29,to:"2021/11/29 0:10"}', async () => {
    await assertGraphql(
      gql`
        query {
          authLogIp(range: { from: "2021/11/29", to: "2021/11/29 0:10" }) {
            ip
            port
            country
            city {
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
            asn {
              asn
              organization {
                organizationName
                passwordList
                userList
              }
            }
            authInfo {
              ip
              user
              password
              authtime
              rtt
              unixtime
              usec
              kex
              newkey
              date
              detect
            }
            user
            password
          }
        }
      `,
      {
        data: {
          authLogIp: [
            {
              ip: '124.160.96.249',
              port: [3278, 39893],
              country: 'China',
              city: {
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
              asn: {
                asn: [4837],
                organization: {
                  organizationName: 'CHINA UNICOM China169 Backbone',
                  passwordList: ['EXFLASH', 'admin520', 'tang520@!~'],
                  userList: ['root'],
                },
              },
              authInfo: [
                {
                  ip: '76.176.69.186',
                  user: 'root',
                  password: '1472588564',
                  authtime: 0.15048,
                  rtt: 348.621626,
                  unixtime: 1638111618,
                  usec: 244229,
                  kex: 559.827194,
                  newkey: 137.416059,
                  date: '2021/11/29 0:00:18',
                  detect: 'Normal',
                },
                {
                  ip: '186.67.248.8',
                  user: 'ybr',
                  password: 'ybr',
                  authtime: 0.317832,
                  rtt: -211.05276,
                  unixtime: 1638111689,
                  usec: 927459,
                  kex: 288.235998,
                  newkey: -710.341518,
                  date: '2021/11/29 0:01:29',
                  detect: 'Normal',
                },
                {
                  ip: '124.160.96.249',
                  user: 'root',
                  password: 'tang520@!~',
                  authtime: 0.067401,
                  rtt: 0.062113,
                  unixtime: 1638111831,
                  usec: 883556,
                  kex: 0.061991,
                  newkey: 0.062235,
                  date: '2021/11/29 0:03:51',
                  detect: 'Normal',
                },
                {
                  ip: '116.153.2.143',
                  user: 'root',
                  password: 'EXFLASH',
                  authtime: 0.088023,
                  rtt: 68.0827,
                  unixtime: 1638111890,
                  usec: 292031,
                  kex: 67.513245,
                  newkey: 68.652156,
                  date: '2021/11/29 0:04:50',
                  detect: 'Normal',
                },
                {
                  ip: '159.65.150.106',
                  user: 'root',
                  password: '159357uu',
                  authtime: 0.129279,
                  rtt: 0.123203,
                  unixtime: 1638111905,
                  usec: 657144,
                  kex: 0.123065,
                  newkey: 0.123342,
                  date: '2021/11/29 0:05:05',
                  detect: 'Normal',
                },
                {
                  ip: '94.232.46.202',
                  user: 'root',
                  password: 'res1!+',
                  authtime: 0.278317,
                  rtt: 256.316066,
                  unixtime: 1638111937,
                  usec: 834946,
                  kex: 255.520908,
                  newkey: 257.111224,
                  date: '2021/11/29 0:05:37',
                  detect: 'Normal',
                },
                {
                  ip: '76.176.69.186',
                  user: 'root',
                  password: 'hxfxhfdx',
                  authtime: 0.146309,
                  rtt: 335.6449,
                  unixtime: 1638111984,
                  usec: 219162,
                  kex: 544.802218,
                  newkey: 126.487582,
                  date: '2021/11/29 0:06:24',
                  detect: 'Normal',
                },
                {
                  ip: '186.67.248.8',
                  user: 'root',
                  password: '%#@!',
                  authtime: 0.304035,
                  rtt: -217.190116,
                  unixtime: 1638112014,
                  usec: 478608,
                  kex: -717.070932,
                  newkey: 282.690699,
                  date: '2021/11/29 0:06:54',
                  detect: 'Normal',
                },
                {
                  ip: '124.160.96.249',
                  user: 'root',
                  password: 'admin520',
                  authtime: 0.071692,
                  rtt: 0.061105,
                  unixtime: 1638112162,
                  usec: 746196,
                  kex: 0.059698,
                  newkey: 0.062512,
                  date: '2021/11/29 0:09:22',
                  detect: 'Normal',
                },
              ],
              user: ['root'],
              password: ['admin520', 'tang520@!~'],
            },
            {
              ip: '159.65.150.106',
              port: [40142],
              country: 'India',
              city: {
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
              asn: {
                asn: [14061],
                organization: {
                  organizationName: 'DIGITALOCEAN-ASN',
                  passwordList: ['159357uu'],
                  userList: ['root'],
                },
              },
              authInfo: [
                {
                  ip: '76.176.69.186',
                  user: 'root',
                  password: '1472588564',
                  authtime: 0.15048,
                  rtt: 348.621626,
                  unixtime: 1638111618,
                  usec: 244229,
                  kex: 559.827194,
                  newkey: 137.416059,
                  date: '2021/11/29 0:00:18',
                  detect: 'Normal',
                },
                {
                  ip: '186.67.248.8',
                  user: 'ybr',
                  password: 'ybr',
                  authtime: 0.317832,
                  rtt: -211.05276,
                  unixtime: 1638111689,
                  usec: 927459,
                  kex: 288.235998,
                  newkey: -710.341518,
                  date: '2021/11/29 0:01:29',
                  detect: 'Normal',
                },
                {
                  ip: '124.160.96.249',
                  user: 'root',
                  password: 'tang520@!~',
                  authtime: 0.067401,
                  rtt: 0.062113,
                  unixtime: 1638111831,
                  usec: 883556,
                  kex: 0.061991,
                  newkey: 0.062235,
                  date: '2021/11/29 0:03:51',
                  detect: 'Normal',
                },
                {
                  ip: '116.153.2.143',
                  user: 'root',
                  password: 'EXFLASH',
                  authtime: 0.088023,
                  rtt: 68.0827,
                  unixtime: 1638111890,
                  usec: 292031,
                  kex: 67.513245,
                  newkey: 68.652156,
                  date: '2021/11/29 0:04:50',
                  detect: 'Normal',
                },
                {
                  ip: '159.65.150.106',
                  user: 'root',
                  password: '159357uu',
                  authtime: 0.129279,
                  rtt: 0.123203,
                  unixtime: 1638111905,
                  usec: 657144,
                  kex: 0.123065,
                  newkey: 0.123342,
                  date: '2021/11/29 0:05:05',
                  detect: 'Normal',
                },
                {
                  ip: '94.232.46.202',
                  user: 'root',
                  password: 'res1!+',
                  authtime: 0.278317,
                  rtt: 256.316066,
                  unixtime: 1638111937,
                  usec: 834946,
                  kex: 255.520908,
                  newkey: 257.111224,
                  date: '2021/11/29 0:05:37',
                  detect: 'Normal',
                },
                {
                  ip: '76.176.69.186',
                  user: 'root',
                  password: 'hxfxhfdx',
                  authtime: 0.146309,
                  rtt: 335.6449,
                  unixtime: 1638111984,
                  usec: 219162,
                  kex: 544.802218,
                  newkey: 126.487582,
                  date: '2021/11/29 0:06:24',
                  detect: 'Normal',
                },
                {
                  ip: '186.67.248.8',
                  user: 'root',
                  password: '%#@!',
                  authtime: 0.304035,
                  rtt: -217.190116,
                  unixtime: 1638112014,
                  usec: 478608,
                  kex: -717.070932,
                  newkey: 282.690699,
                  date: '2021/11/29 0:06:54',
                  detect: 'Normal',
                },
                {
                  ip: '124.160.96.249',
                  user: 'root',
                  password: 'admin520',
                  authtime: 0.071692,
                  rtt: 0.061105,
                  unixtime: 1638112162,
                  usec: 746196,
                  kex: 0.059698,
                  newkey: 0.062512,
                  date: '2021/11/29 0:09:22',
                  detect: 'Normal',
                },
              ],
              user: ['root'],
              password: ['159357uu'],
            },
          ],
        },
      }
    );
  });
});
