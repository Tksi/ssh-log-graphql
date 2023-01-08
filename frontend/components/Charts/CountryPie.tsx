import type { VFC } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { gql, useQuery } from '@apollo/client';

type authLogCount = {
  _id: string;
  count: number;
}[];

const QUERY = {
  gql: gql`
    query {
      authLogCount(by: country) {
        _id
        count
      }
    }
  `,
};

export const CountryPie: VFC = () => {
  const { loading, error, data } = useQuery<{ authLogCount: authLogCount }>(
    QUERY.gql,
    {
      pollInterval: 10 * 1000,
    }
  );

  return (
    <>
      {loading || error || (
        <>
          <Chart
            options={{
              labels: data.authLogCount.map((v) => v._id),
              title: {
                text: 'Area(today)',
              },
            }}
            series={data.authLogCount.map((v) => v.count)}
            type="pie"
          />
        </>
      )}
    </>
  );
};
