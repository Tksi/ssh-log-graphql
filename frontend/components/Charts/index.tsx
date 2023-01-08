import type { VFC } from 'react';
import { CountByDay } from './CountByDay';
import { CountByHour } from './CountByHour';
import { CountryPie } from './CountryPie';

export const Charts: VFC = () => {
  return (
    <>
      <CountByHour />
      <CountByDay />
      <CountryPie />
    </>
  );
};
