import React from 'react';
import { getMe } from '@common/api/auth';
import { useAuth } from '@common/auth/authContext';
import { ApiGetUserI } from '@common/auth/types';
import { PAGE_API_STATES } from '@common/hooks/usePage';

export const ME_API_STATES = {
  LOGGED_OUT: 'LOGGED_OUT',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const useMe = (
  setJwt: (jwt: string) => void
): {
  state: string;
  data: ApiGetUserI;
  error: string;
  reload: () => void;
} => {
  const [state, setState] = React.useState<string>(PAGE_API_STATES.LOADING);
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ApiGetUserI>(null);
  const { isLoggedIn } = useAuth();

  const load = () => {
    if (!isLoggedIn) {
      setState(ME_API_STATES.LOGGED_OUT);
    } else {
      setState(PAGE_API_STATES.LOADING);
      getMe()
        .then((data) => {
          setData(data);
          setState(PAGE_API_STATES.SUCCESS);
        })
        .catch((e) => {
          setError(e?.message || e.toString());
          setState(PAGE_API_STATES.ERROR);
          setJwt(null);
        });
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  return {
    state,
    data,
    error,
    reload: load,
  };
};
