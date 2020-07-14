import React from 'react';

import { Image } from '@app/vendor/types';

import './ParkGallery.css';
import { useIntl } from 'react-intl';
import { LazyImage } from '@app/theme';

const ParkGallery = ({
  images,
  className = '',
}: {
  images: Array<Image>;
  className?: string;
}) => {
  const { formatMessage } = useIntl();
  console.log('IMAGES', images);
  return (
    <div className={`${className} park-gallery`}>
      <h2 className="park-gallery__title">
        {formatMessage({ id: 'park.gallery' })}
      </h2>
      <div className="park-gallery__list">
        {images.map(image => {
          return (
            <div className="park-gallery__element">
              <LazyImage
                image={image}
                className="park-gallery__img"
                height={300}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkGallery;
