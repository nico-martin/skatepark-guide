import React from 'react';

import './ParkGallery.css';
import { useIntl } from 'react-intl';

const ParkGallery = ({
  images,
  className = '',
}: {
  images: Array<any>;
  className?: string;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} park-gallery`}>
      <h2 className="park-gallery__title">
        {formatMessage({ id: 'park.gallery' })}
      </h2>
    </div>
  );
};

export default ParkGallery;
