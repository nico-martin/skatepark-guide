import React from 'react';
import { useStoreState } from 'unistore-hooks';

import { getWeather } from '@app/vendor/api/spg';
import { State } from '@app/store/types';

export const apiStates = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const useWeather = (slug: string) => {
  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: '',
    data: [],
  });

  const { intlLocale }: State = useStoreState(['intlLocale']);
  const setPartData = partialData => setData({ ...data, ...partialData });

  React.useEffect(() => {
    setPartData({
      state: apiStates.LOADING,
    });
    getWeather(slug, intlLocale)
      .then(data => {
        setPartData({
          state: apiStates.SUCCESS,
          data,
        });
      })
      .catch(() => {
        setPartData({
          state: apiStates.ERROR,
          error: 'fetch failed',
        });
      });
  }, []);

  return data;
};
