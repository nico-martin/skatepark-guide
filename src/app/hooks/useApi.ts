import React from 'react';

export const states = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const useApi = promise => {
  const [data, setData] = React.useState({
    state: states.LOADING,
    error: '',
    data: undefined,
  });

  const setPartData = partialData => setData({ ...data, ...partialData });

  React.useEffect(() => {
    setPartData({
      state: states.LOADING,
    });
    promise()
      .then(data => {
        setPartData({
          state: states.SUCCESS,
          data,
        });
      })
      .catch(() => {
        setPartData({
          state: states.ERROR,
          error: 'fetch failed',
        });
      });
  }, []);

  return data;
};
