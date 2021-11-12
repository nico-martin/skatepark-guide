import React from 'react';
import { useIntl } from 'react-intl';
import { LazyImage, UploadModal } from '@theme';
import { getImages } from '@common/api/park';
import PhotoSwipeLightbox from '@common/modules/photoswipe/photoswipe-lightbox.esm.js';
import '@common/modules/photoswipe/photoswipe.css';
import PhotoSwipe from '@common/modules/photoswipe/photoswipe.esm.js';
import { ApiImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import { createImage, heightByWidth } from '@common/utils/imageProxy';
import styles from './ParkGallery.css';

const imageWidth = window.innerWidth <= 1000 ? 1000 : 2000;

const ParkGalleryImage = ({ image }: { image: ApiImageI }) => {
  const height = React.useMemo(
    () =>
      heightByWidth({
        orgHeight: image.height,
        orgWidth: image.width,
        newWidth: imageWidth,
      }),
    [image]
  );

  const src = React.useMemo(
    () =>
      createImage({
        imageUrl: image.url,
        width: imageWidth,
        height,
      }),
    [image, height]
  );

  return (
    <a
      href={src}
      data-pswp-width={imageWidth}
      data-pswp-height={height}
      target="_blank"
      className={cn(styles.element)}
    >
      <LazyImage image={image} imageClassName={cn(styles.img)} />
    </a>
  );
};

const ParkGallery = ({
  images,
  setImages,
  className = '',
  slug = null,
}: {
  images: Array<ApiImageI>;
  setImages: (images: Array<ApiImageI>) => void;
  className?: string;
  slug?: string;
}) => {
  const [model, setModal] = React.useState<boolean>(true);
  const edit = setImages !== null;
  React.useEffect(() => {
    if (!edit) {
      const options = {
        gallerySelector: '#park-gallery',
        childSelector: 'a',
        pswpModule: PhotoSwipe,
      };
      const lightbox = new PhotoSwipeLightbox(options);
      lightbox.init();
    }
  }, []);

  const { formatMessage } = useIntl();

  return (
    <div className={cn(className, styles.root)}>
      <h2 className={cn(styles.title)}>
        {formatMessage({ id: 'park.gallery' })}
      </h2>
      <div className={cn(styles.list)} id="park-gallery">
        {images.map((image) => (
          <ParkGalleryImage image={image} />
        ))}
        {edit && <button onClick={() => setModal(true)}>add image</button>}
        <UploadModal
          show={model}
          setShow={setModal}
          getImages={!slug ? null : () => getImages(slug)}
          uploadParams={{ parkSlug: slug }}
        />
      </div>
    </div>
  );
};

export default ParkGallery;
