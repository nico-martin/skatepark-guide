import React from 'react';

const ParkWeather = ({
  className = '',
  slug,
}: {
  className?: string;
  slug: string;
}) => {
  return <p>WEATHER: {slug}</p>;
};

export default ParkWeather;

/*import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { useApi, states as apiStates } from '@app/hooks/useApi';
import { Icon, Loader, Message } from '@app/theme';
import { getWeather } from '@app/vendor/api/spg';

import './ParkWeather.css';
import { ApiWeather } from '@app/vendor/@types';

const ParkWeather = ({
  className = '',
  slug,
}: {
  className?: string;
  slug: string;
}) => {
  const [days, setDays] = useState<{
    [key: string]: ApiWeather;
  }>(null);
  const { locale } = useIntl();
  const { data = {}, state, error } = useApi(() => getWeather(slug, locale));

  const { formatMessage } = useIntl();

  useEffect(() => {
    const daysToSet = {};
    if (data.list) {
      data.list.map(weather => {
        const weatherDate = dayjs(weather['dt_txt']);
        const day = weatherDate.format('YYYY-MM-DD');
        if (!(day in days) && parseInt(weatherDate.format('HH')) <= 14) {
          daysToSet[day] = { ...weather, h: weatherDate.format('HH') };
        }
      });
    }
    setDays(daysToSet);
  }, [data]);

  return (
    <div className={`${className} park-weather`}>
      <h2 className="park-weather__title">
        {formatMessage({ id: 'park.weather' })}
      </h2>
      {state === apiStates.LOADING && (
        <Loader className="park-weather__loader" />
      )}
      {state === apiStates.ERROR && <Message type="error">{error}</Message>}
      {state === apiStates.SUCCESS && (
        <React.Fragment>
          <p className="park-weather__source">
            {formatMessage(
              { id: 'park.weather.source' },
              {
                source: (
                  <a
                    href={`https://openweathermap.org/weathermap?zoom=12&lat=${data.city.coord.lat}&lon=${data.city.coord.lon}`}
                    target="_blank"
                  >
                    openweathermap.org
                  </a>
                ),
              }
            )}
          </p>
          <ul className="park-weather__list">
            {Object.values(days).map(day => (
              <li className="park-weather__element">
                <h4 className="park-weather__heading">
                  {dayjs(day['dt_txt']).format('ddd')}
                </h4>
                <Icon
                  className="park-weather__icon"
                  icon={`mdi/weather/${day.weather[0].icon}`}
                />
                <span className="park-weather__description">
                  {day.weather[0].description}
                </span>
                <span className="park-weather__temp">
                  {Math.round(day.main.temp)} °C
                </span>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default ParkWeather;*/
