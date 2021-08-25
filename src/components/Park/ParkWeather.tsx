import React from 'react';
import { useIntl } from 'react-intl';
import { Icon, Loader } from '@theme';
import { useWeather, WEATHER_API_STATES } from '@common/hooks/useWeather';
import { ParkWeatherDayI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import dayjs from '@common/utils/dayjs';
import styles from './ParkWeather.css';

const ParkWeather = ({
  className = '',
  slug,
}: {
  className?: string;
  slug: string;
}) => {
  const { state, data, error } = useWeather(slug);
  const { formatMessage } = useIntl();
  const days = React.useMemo<Array<ParkWeatherDayI>>(
    () =>
      data?.days
        ? data?.days.filter(
            (day, i, days) =>
              day.localDateTime.isAfter(14, 'h') &&
              !days[i - 1]?.localDateTime.isSame(day.localDateTime, 'day')
          )
        : [],
    [data?.days]
  );

  if (state === WEATHER_API_STATES.ERROR) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h2 className={styles.title}>{formatMessage({ id: 'park.weather' })}</h2>
      {state === WEATHER_API_STATES.LOADING && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {state === WEATHER_API_STATES.SUCCESS && (
        <React.Fragment>
          <p className={styles.source}>
            {formatMessage(
              { id: 'park.weather.source' },
              {
                source: (
                  <a href={data.source.url} target="_blank">
                    openweathermap.org ({dayjs(data.source.time).format('lll')})
                  </a>
                ),
              }
            )}
          </p>
          <ul className={styles.list}>
            {Object.values(days).map((day) => (
              <li className={styles.element}>
                <h4 className={styles.heading}>
                  {day.localDateTime.format('ddd')}
                </h4>
                <Icon
                  className={styles.icon}
                  icon={`mdi/weather/${day.icon}`}
                  title={day.desc}
                  alt={day.desc}
                />
                <span className={styles.description}>{day.desc}</span>
                <span className={styles.temp}>{day.temp} °C</span>
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default ParkWeather;
