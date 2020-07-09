import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import './ParkWeather.css';
import { useWeather, apiStates } from '@app/hooks/useWeather';
import { Loader, Message } from '@app/theme';

const ParkWeather = ({
  className = '',
  slug,
}: {
  className?: string;
  slug: string;
}) => {
  const { state, error, data } = useWeather(slug);
  const { formatMessage } = useIntl();
  console.log('DATA', data);
  return (
    <div className={`${className} park-weather`}>
      <h2>{formatMessage({ id: 'park.weather' })}</h2>
      {state === apiStates.LOADING && (
        <Loader className="park-weather__loader" />
      )}
      {state === apiStates.ERROR && <Message type="error">{error}</Message>}
      {/* state === apiStates.SUCCESS */}
    </div>
  );
};

export default ParkWeather;
