import React from 'react';
import cn from 'classnames';

import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/bgset/ls.bgset';
import './LazyImage.css';

import { Image } from '@app/vendor/types';
import { src, srcSet, thumbnail } from '@app/vendor/imageProxy';

const BASE = 'lazyimage';

declare global {
  interface Window {
    lazySizesConfig: any;
  }
}

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
}: {
  image: Image;
  background?: boolean;
  alt: string;
}) => {
  const set = srcSet({ imageUrl: image[0], width: image[1] });
  return (
    <figure className={cn(BASE, background ? `${BASE}--background` : '')}>
      {background ? (
        <React.Fragment>
          <div
            aria-hidden="true"
            className={`${BASE}__preview`}
            style={{
              backgroundImage: "url('" + thumbnail(image[0]) + "')",
            }}
          />
          <div
            title={alt}
            className={`${BASE}__image ${BASE}__image--lazyload`}
            style={{ backgroundImage: "url('" + thumbnail(image[0]) + "')" }}
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
            src={thumbnail(image[0])}
          />
          <img
            alt={alt}
            width={image[1]}
            height={image[2]}
            className={`${BASE}__image ${BASE}__image--lazyload`}
            data-sizes="auto"
            src={thumbnail(image[0])}
            data-src={src(image[0])}
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
