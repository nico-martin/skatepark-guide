import React from 'react';
import { getPark } from '@common/api/park';
import { Park } from '@comp/Park/static/types';
import { mapApiToPark } from '@comp/Park/static/functions';

export const states = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const usePark = (slug: string) => {
  const [park, setPark] = React.useState<Park>(null);
  const [state, setState] = React.useState<string>(states.LOADING);

  React.useEffect(() => {
    getPark(slug)
      .then((resp) => setPark(mapApiToPark(resp.data[0])))
      .catch(() => setState(states.LOADING));
  }, []);

  return {
    park,
    state,
  };
};
