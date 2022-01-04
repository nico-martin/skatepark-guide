import React from 'react';
import { useIntl } from 'react-intl';
import { Icon, LazyImage, UploadModal } from '@theme';
import { getImages } from '@common/api/park';
import { ApiImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import { isBrowser } from '@common/utils/helpers';
import { createImage, heightByWidth } from '@common/utils/imageProxy';
import styles from './ParkGallery.module.css';

let PhotoSwipeLightbox = null;
let PhotoSwipe = null;

if (isBrowser()) {
  PhotoSwipeLightbox =
    require('@common/modules/photoswipe/photoswipe-lightbox.esm.js').default;
  PhotoSwipe = require('@common/modules/photoswipe/photoswipe.esm.js').default;
}

let imageWidth = null;

const ParkGalleryImage = ({ image }: { image: ApiImageI }) => {
  React.useEffect(() => {
    imageWidth = window.innerWidth <= 1000 ? 1000 : 2000;
  }, []);
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
      rel="noreferrer"
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
  const [model, setModal] = React.useState<boolean>(false);
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
        {edit && (
          <button
            title={formatMessage({ id: 'park.edit.gallery.add' })}
            onClick={() => setModal(true)}
            className={styles.addImage}
          >
            <Icon icon="plus" className={styles.addImageIcon} />
          </button>
        )}
        {images.map((image) => (
          <ParkGalleryImage key={image.id} image={image} />
        ))}
        <UploadModal
          show={model}
          setShow={setModal}
          getImages={!slug ? null : () => getImages(slug)}
          uploadParams={{ parkSlug: slug }}
          onSelectImages={(images) => setImages(images)}
          selectedImages={images}
          selectMultiple
        />
      </div>
    </div>
  );
};

export default ParkGallery;
