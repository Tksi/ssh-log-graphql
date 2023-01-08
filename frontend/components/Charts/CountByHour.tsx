import type { VFC } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { gql, useQuery } from '@apollo/client';

type authLogCount = {
  _id: string;
  count: number;
}[];

const beforeHour = (before = 1, date = new Date()) => {
  const HOUR = 60 * 60 * 1000;
  const beforDate = new Date(date.getTime() - HOUR * before);
  return new Date(
    `${beforDate.toLocaleDateString()}, ${beforDate.getHours()}:00`
  );
};

const QUERY = {
  gql: gql`
    query ($range: InputTimeRange!) {
      authLogCount(by: HOUR, range: $range) {
        _id
        count
      }
    }
  `,
  variables: {
    range: {
      from: beforeHour(24).toString(),
      to: beforeHour(-1).toString(),
    },
  },
};

export const CountByHour: VFC = () => {
  const { loading, error, data } = useQuery<{ authLogCount: authLogCount }>(
    QUERY.gql,
    {
      variables: QUERY.variables,
      pollInterval: 1000,
    }
  );

  return (
    <>
      {loading || error || (
        <Chart
          options={{
            xaxis: {
              type: 'datetime',
              // 入れないと9時間ずれる
              labels: {
                datetimeUTC: false,
                format: 'HH:mm',
              },
            },
            markers: {
              size: 5,
            },
            stroke: {
              curve: 'smooth',
            },
            title: {
              text: 'Access/hour',
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
          type="line"
        />
      )}
    </>
  );
};
