import React from 'react';
import './Marker.css';

import IntlLink from '@app/intl/IntlLink';

const Marker = ({
  name,
  lat,
  lng,
  slug,
  small = false,
}: {
  name: string;
  lat: number;
  lng: number;
  slug: string;
  small?: boolean;
}) => {
  return (
    <IntlLink
      href={`park/${slug}/`}
      className={`marker ${small ? 'marker--small' : ''}`}
      title={name}
    />
  );
};

export default Marker;
