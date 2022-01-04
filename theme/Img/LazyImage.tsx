import React from 'react';
import { ApiImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import { isBrowser } from '@common/utils/helpers';
import { createImage, createSrcSet } from '@common/utils/imageProxy';
import styles from './LazyImage.module.css';

isBrowser() && require('./lazyConfig');

const LazyImage = ({
  image,
  background = false,
  alt,
  width = 0,
  height = 0,
  className = '',
  imageClassName = '',
  ...props
}: {
  image: ApiImageI;
  background?: boolean;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  [key: string]: any;
}) => {
  const imageSize = React.useMemo<{
    width: number;
    height: number;
  }>(() => {
    let imageSize = {
      width: image.width,
      height: image.height,
    };

    if (width !== 0 && height !== 0) {
      imageSize = {
        width,
        height,
      };
    } else if (width !== 0) {
      imageSize = {
        width,
        height: image.height / (image.width / width),
      };
    } else if (height !== 0) {
      imageSize = {
        width: (height / image.height) * image.width,
        height,
      };
    }
    return imageSize;
  }, [image]);

  const src = React.useMemo<string>(
    () =>
      createImage({
        imageUrl: image.url,
        width: imageSize.width,
        height: imageSize.height,
      }),
    [image, imageSize]
  );

  const set = React.useMemo(
    () =>
      createSrcSet({
        imageUrl: image.url,
        width: imageSize.width,
        height: imageSize.height,
      }),
    [image, imageSize]
  );

  const thumbnailUrl = React.useMemo(
    () =>
      createImage({
        imageUrl: image.url,
        width: 400,
        height: imageSize.height / (imageSize.width / 400),
        transform: {
          blur: 20,
          quality: 50,
        },
      }),
    [image, imageSize]
  );

  return (
    <figure
      className={cn(styles.root, className, {
        [styles.isBackground]: background,
      })}
      {...props}
    >
      {background ? (
        <React.Fragment>
          <div
            aria-hidden="true"
            className={cn(styles.preview, imageClassName)}
            style={{
              backgroundImage: "url('" + thumbnailUrl + "')",
            }}
          />
          <div
            title={alt || image.alt}
            className={cn(styles.image, styles.lazy, imageClassName)}
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
            className={cn(styles.preview, imageClassName)}
            src={thumbnailUrl}
            alt={'Preview: ' + alt || image.alt}
          />
          <img
            alt={alt || image.alt}
            width={imageSize.width}
            height={imageSize.height}
            className={cn(styles.image, styles.lazy, imageClassName)}
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
