import React from 'react';
import { useIntl } from 'react-intl';
import { getWeather } from '@common/api/park';
import { ParkWeatherI } from '@common/types/parks';
import dayjs from '@common/utils/dayjs';

export const WEATHER_API_STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const useWeather = (
  slug: string
): {
  state: string;
  data: ParkWeatherI;
  error: string;
} => {
  const [state, setState] = React.useState<string>(WEATHER_API_STATES.LOADING);
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<ParkWeatherI>();
  const { locale: activeLocale } = useIntl();

  React.useEffect(() => {
    setState(WEATHER_API_STATES.LOADING);
    getWeather(slug, activeLocale)
      .then(({ city, days, source }) => {
        setData({
          city,
          days: days.map((day) => ({
            ...day,
            localDateTime: dayjs(day.localDateTime, 'Y-m-d H:i:s'),
          })),
          source,
        });
        setState(WEATHER_API_STATES.SUCCESS);
      })
      .catch((e) => {
        setError(e.toString());
        setState(WEATHER_API_STATES.ERROR);
      });
  }, [slug]);

  return {
    state,
    data,
    error,
  };
};
