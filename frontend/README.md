# graphql-ssh/frontend

graphQL サーバからのデータを４つのグラフ/地図にプロット

## Map.tsx

- GraphQL サーバに Mutation で追加されたログを地図上にプロット
- Subscription によるリアルタイム更新

## Charts/CountByHour.tsx

- １時間ごとのログの数をプロット
- Mutation のポーリングによる１秒ごとの更新

## Charts/CountByDay.tsx

- 1 日ごとのログの数をプロット
- Mutation のポーリングによる５秒ごとの更新

## Charts/CountryPie.tsx

- 今日のアクセス元地域の割合をプロット
