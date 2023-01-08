import type { VFC } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { gql, useQuery } from '@apollo/client';

type authLogCount = {
  _id: string;
  count: number;
}[];

const beforeDay = (before = 1, date = new Date()) => {
  const DAY = 60 * 60 * 24 * 1000;
  return new Date(new Date(date.getTime() - DAY * before).toLocaleDateString());
};

const QUERY = {
  gql: gql`
    query ($range: InputTimeRange!) {
      authLogCount(range: $range) {
        _id
        count
      }
    }
  `,
  variables: {
    range: {
      from: beforeDay(6).toString(),
      to: beforeDay(-1).toString(),
    },
  },
};

export const CountByDay: VFC = () => {
  const { loading, error, data } = useQuery<{ authLogCount: authLogCount }>(
    QUERY.gql,
    {
      variables: QUERY.variables,
      pollInterval: 5000,
    }
  );

  return (
    <>
      {loading || error || (
        <>
          <Chart
            options={{
              xaxis: {
                type: 'datetime',
                // 入れないと9時間ずれる
                labels: {
                  datetimeUTC: false,
                  format: 'MM/dd',
                },
              },
              dataLabels: {
                enabled: false,
              },
              title: {
                text: 'Access/day',
              },
            }}
            series={[
              {
                data: data.authLogCount.map((obj) => ({
                  x: new Date(obj._id).getTime(),
                  y: obj.count,
                })),
              },
            ]}
            type="bar"
          />
        </>
      )}
    </>
  );
};
