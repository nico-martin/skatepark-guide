import React from 'react';
import { getPark, postPark } from '@common/api/park';
import { ParkI } from '@common/types/parks';
import { objectDiff, objectShallowEqual } from '@common/utils/helpers';

export enum PARK_API_STATES {
  LOADING = 'LOADING',
  UPDATING = 'UPDATING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export const usePark = (
  slug: string
): {
  state: string;
  data: ParkI;
  error: string;
  updatePark: () => void;
  setPark: (partData: Partial<ParkI>) => void;
  hasUnsavedChanges: boolean;
} => {
  const [state, setState] = React.useState<string>(PARK_API_STATES.LOADING);
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ParkI>();
  const [initialData, setInitialData] = React.useState<ParkI>();

  React.useEffect(() => {
    setState(PARK_API_STATES.LOADING);
    getPark(slug)
      .then((data) => {
        setInitialData(data);
        setData(data);
        setState(PARK_API_STATES.SUCCESS);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setState(PARK_API_STATES.ERROR);
      });
  }, [slug]);

  const updatePark = () => {
    setState(PARK_API_STATES.UPDATING);
    postPark(slug, objectDiff(initialData, data))
      .then((data) => {
        setInitialData(data);
        setData(data);
        setState(PARK_API_STATES.SUCCESS);
      })
      .catch((e) => {
        //setError(e.toString());
        //setState(PARK_API_STATES.ERROR);
      });
  };

  return {
    state,
    data,
    error,
    updatePark,
    setPark: (partData) => setData((data) => ({ ...data, ...partData })),
    hasUnsavedChanges: objectShallowEqual(initialData, data),
  };
};