import React from 'react';
import cn from 'classnames';

import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/bgset/ls.bgset';
import './LazyImage.css';

import { Image } from '@app/vendor/types';
import { createImage, createSrcSet } from '@app/vendor/imageProxy';

const BASE = 'lazyimage';

lazySizes.cfg.lazyClass = `${BASE}__image--lazyload`;
lazySizes.cfg.loadingClass = `${BASE}__image--lazyloading`;
lazySizes.cfg.loadedClass = `${BASE}__image--lazyloaded`;
document.addEventListener('lazyloaded', e => {
  lazySizesFindParent(e.target).classList.add(`${BASE}--loaded`);
});

const lazySizesFindParent = el => {
  while ((el = el.parentElement) && !el.classList.contains(BASE));
  return el;
};

const LazyImage = ({
  image,
  background = false,
  alt,
  width = 0,
  height = 0,
  className = '',
  ...props
}: {
  image: Image;
  background?: boolean;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
}) => {
  let imageSize = {
    width: image[1],
    height: image[2],
  };

  if (width !== 0 && height !== 0) {
    imageSize = {
      width,
      height,
    };
  } else if (width !== 0) {
    imageSize = {
      width,
      height: image[2] / (image[1] / width),
    };
  } else if (height !== 0) {
    imageSize = {
      width: (height / image[2]) * image[1],
      height,
    };
  }

  const src = createImage({
    imageUrl: image[0],
    width: imageSize.width,
    height: imageSize.height,
  });

  const set = createSrcSet({
    imageUrl: image[0],
    ...imageSize,
  });

  const thumbnailUrl = createImage({
    imageUrl: image[0],
    width: 400,
    height: imageSize.height / (imageSize.width / 400),
    transform: {
      blur: 20,
      quality: 50,
    },
  });

  return (
    <figure
      className={cn(BASE, background ? `${BASE}--background` : '', className)}
      {...props}
    >
      {background ? (
        <React.Fragment>
          <div
            aria-hidden="true"
            className={`${BASE}__preview`}
            style={{
              backgroundImage: "url('" + thumbnailUrl + "')",
            }}
          />
          <div
            title={alt}
            className={`${BASE}__image ${BASE}__image--lazyload`}
            style={{ backgroundImage: "url('" + thumbnailUrl + "')" }}
            data-bgset={Object.entries(set)
              .map(([width, url]) => `${url} ${width}w`)
              .join(', ')}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            aria-hidden="true"
            className={`${BASE}__preview`}
            src={thumbnailUrl}
          />
          <img
            alt={alt}
            width={imageSize.width}
            height={imageSize.height}
            className={`${BASE}__image ${BASE}__image--lazyload`}
            data-sizes="auto"
            src={thumbnailUrl}
            data-src={src}
            data-srcset={Object.entries(set)
              .map(([width, url]) => `${url} ${width}w`)
              .join(', ')}
          />
        </React.Fragment>
      )}
    </figure>
  );
};

export default LazyImage;
