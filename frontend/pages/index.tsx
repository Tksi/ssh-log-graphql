import type { VFC } from 'react';
import { Map } from 'components/Map';
import { Charts } from 'components/Charts';

const index: VFC = () => {
  return (
    <>
      <Map />
      <Charts />
    </>
  );
};

export default index;
