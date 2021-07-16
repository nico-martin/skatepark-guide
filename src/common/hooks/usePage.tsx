import React from 'react';
import { getPage } from '@common/api/page';
import { useLocale } from '@common/intl/intlContext';
import { ApiPageI } from '@common/types/page';

export const PAGE_API_STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const usePage = (
  slug: string
): {
  state: string;
  data: ApiPageI;
  error: string;
} => {
  const [state, setState] = React.useState<string>(PAGE_API_STATES.LOADING);
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ApiPageI>();
  const { locale } = useLocale();

  React.useEffect(() => {
    setState(PAGE_API_STATES.LOADING);
    getPage(slug)
      .then((data) => {
        setData(data);
        setState(PAGE_API_STATES.SUCCESS);
      })
      .catch((e) => {
        setError(e.toString());
        setState(PAGE_API_STATES.ERROR);
      });
  }, [slug]);

  return {
    state,
    data,
    error,
  };
};
