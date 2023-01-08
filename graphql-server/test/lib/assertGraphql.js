import assert from 'assert/strict';
import { request } from 'graphql-request';

export const assertGraphql = (
  query,
  response,
  host = 'http://localhost:44444/graphql'
) => {
  return request(host, query).then((data) =>
    assert.deepStrictEqual({ data }, response)
  );
};
