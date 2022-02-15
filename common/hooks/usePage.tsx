import React from 'react';
import { useIntl } from 'react-intl';
import { getPage } from '@common/api/page';
//import { useLocale } from '@common/intl/intlContext';
import { ApiPageI } from '@common/types/page';

export const PAGE_API_STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const usePage = (
  slug: string,
  pageObject: ApiPageI = null
): {
  state: string;
  data: ApiPageI;
  error: string;
} => {
  const [state, setState] = React.useState<string>(
    pageObject ? PAGE_API_STATES.SUCCESS : PAGE_API_STATES.LOADING
  );
  const { locale } = useIntl();

  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ApiPageI>(pageObject);

  React.useEffect(() => {
    if (pageObject) {
      return;
    }
    setState(PAGE_API_STATES.LOADING);
    getPage(slug, locale)
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
