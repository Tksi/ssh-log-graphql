import type { VFC } from 'react';
import { useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import {
  ComposableMap,
  Graticule,
  Geographies,
  Geography,
  Line,
  Annotation,
} from 'react-simple-maps';

type log = {
  __typename: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  date: string;
  user: string;
  password: string;
  width?: number;
};

export const Map: VFC = () => {
  const [state, setState] = useState<[string, log][]>([]);

  // subscriptionでデータを受け取るたびにstateを更新
  const { data, loading } = useSubscription<{ log: log }>(
    gql`
      subscription {
        log {
          country
          city
          longitude
          latitude
          date
          user
          password
        }
      }
    `,
    {
      onSubscriptionData: ({
        subscriptionData: {
          data: { log },
        },
      }) => {
        setState((state) => {
          // オブジェクト化
          const stateObj = Object.fromEntries(state);

          // widthを+1、cityがない場合はcountryを基準
          stateObj[log.city ?? log.country] = {
            width:
              stateObj[log.city ?? log.country]?.width === undefined
                ? 1
                : stateObj[log.city ?? log.country].width + 1,
            ...log,
          };

          // 配列化して古い順にソート
          const stateArr = Object.entries(stateObj).sort(
            ([, { date: a }], [, { date: b }]) =>
              new Date(a).getTime() - new Date(b).getTime()
          );

          // 75件以上のときは古いのから消去
          if (stateArr.map((v) => v[1].width).reduce((a, b) => a + b) > 75) {
            if (--stateArr[0][1].width <= 0) stateArr.shift();
          }

          return stateArr;
        });
      },
    }
  );

  return (
    <div>
      <h1
        style={{
          fontSize: '2rem',
          position: 'absolute',
          marginLeft: '.5rem',
        }}
      >
        {loading ? 'Loading' : `${data?.log.date}`}
      </h1>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [0, 29],
          scale: 133,
          rotate: [206, 0, 0],
        }}
        height={455}
      >
        <Graticule stroke="#DDD" />
        <Geographies
          geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
          fill="#D6D6DA"
          stroke="#FFFFFF"
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {state.map((v, i) => (
          <g key={i}>
            <Line
              from={[135, 34]}
              to={[v[1]?.longitude, v[1]?.latitude]}
              stroke={i === state.length - 1 ? '#ff684a' : '#c2e9ff'}
              strokeWidth={Math.round(v[1].width / 2)}
              strokeLinecap="round"
            />
            {i === state.length - 1 && (
              <>
                <Annotation
                  subject={[v[1]?.longitude, v[1]?.latitude]}
                  dy={20}
                  connectorProps={{
                    strokeWidth: 0,
                  }}
                >
                  <text
                    x={v[1]?.longitude}
                    y={v[1]?.latitude + 20}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    fill="#ff684a"
                  >
                    <tspan x={0} y={0}>
                      {v[1]?.city ?? v[1]?.country ?? 'Unknown'}
                    </tspan>
                    <tspan x={0} y={20} fill="gray">
                      {v[1]?.user}
                    </tspan>
                    <tspan x={0} y={35} fill="gray">
                      {v[1]?.password}
                    </tspan>
                  </text>
                </Annotation>
              </>
            )}
          </g>
        ))}
      </ComposableMap>
    </div>
  );
};
