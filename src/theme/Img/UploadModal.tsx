import React from 'react';
import { FullLoader, LazyImage, PortalBox, SHADOW_BOX_SIZES } from '@theme';
import { ApiImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import DropZone from './DropZone';
import UploadImage from './UploadImage';
import styles from './UploadModal.css';

const UploadModal = ({
  title = 'Upload Image',
  show,
  setShow,
  getImages = null,
  activeImages: initialActiveImages = [],
  uploadParams = {},
}: {
  title?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  getImages?: () => Promise<Array<ApiImageI>>;
  activeImages?: Array<number>;
  uploadParams?: Record<string, string>;
}) => {
  const [images, setImages] = React.useState<Array<ApiImageI | File>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeImages, setActiveImages] =
    React.useState<Array<number>>(initialActiveImages);
  const [filesToUpload, setFilesToUpload] = React.useState<Array<File>>([]);

  React.useEffect(() => {
    if (getImages && show) {
      setLoading(true);
      getImages()
        .then((images) => setImages(images))
        .finally(() => setLoading(false));
    }
  }, [show]);

  return (
    <PortalBox
      className={styles.root}
      show={show}
      setShow={setShow}
      size={SHADOW_BOX_SIZES.LARGE}
      title={title}
    >
      <DropZone
        id="upload-images"
        onChange={(files) =>
          setImages((images) => [...Array.from(files), ...images])
        }
      />
      <div className={styles.images}>
        {filesToUpload.map((file) => (
          <span>{file.name}</span>
        ))}
        {loading ? (
          <FullLoader spacingTop large />
        ) : (
          images.map((image, i) => (
            <div key={i}>
              {image instanceof File ? (
                <UploadImage
                  file={image}
                  width={100}
                  height={100}
                  params={uploadParams}
                />
              ) : (
                <button
                  className={cn(styles.image, {
                    [styles.imageChosen]: activeImages.indexOf(image.id) !== -1,
                  })}
                >
                  <LazyImage image={image} width={100} height={100} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <button onClick={() => setShow(false)}>close</button>
    </PortalBox>
  );
};

export default UploadModal;
