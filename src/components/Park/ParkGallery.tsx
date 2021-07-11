import React from 'react';
import { useIntl } from 'react-intl';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { LazyImage } from '@theme';
import cn from '@common/utils/classnames';
import styles from './ParkGallery.css';

//require('../../../node_modules/photoswipe/dist/photoswipe.css');
//require('../../../node_modules/photoswipe/dist/default-skin/default-skin.css');

const ParkGallery = ({
  images,
  className = '',
}: {
  images: Array<any>;
  className?: string;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={cn(className, styles.root)}>
      <h2 className={cn(styles.title)}>
        {formatMessage({ id: 'park.gallery' })}
      </h2>
      <Gallery>
        <div className={cn(styles.list)}>
          {images.map((image) => (
            <Item
              original={image.src}
              thumbnail="https://placekitten.com/80/60?image=1"
              width={image.width}
              height={image.height}
            >
              {({ ref, open }) => (
                <span ref={ref} className={cn(styles.element)}>
                  <LazyImage image={image} imageClassName={cn(styles.img)} />
                </span>
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
};

export default ParkGallery;
