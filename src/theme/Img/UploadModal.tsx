import React from 'react';
import { FullLoader, PortalBox, SHADOW_BOX_SIZES } from '@theme';
import { ApiImageI, ImageId } from '@common/types/image';
import DropZone from './DropZone';
import UploadImageImage from './UploadImageImage';
import styles from './UploadModal.css';
import UploadModalImage from './UploadModalImage';

const UploadModal = ({
  title = 'Upload Image',
  show,
  setShow,
  getImages = null,
  selectedImages: initialSelectedImages = [],
  uploadParams = {},
}: {
  title?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  getImages?: () => Promise<Array<ApiImageI>>;
  selectedImages?: Array<number>;
  uploadParams?: Record<string, string>;
}) => {
  const [images, setImages] = React.useState<Array<ApiImageI | File>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeImage, setActiveImage] = React.useState<ApiImageI>(null);
  const [selectedImages, setSelectedImages] = React.useState<Array<ImageId>>(
    initialSelectedImages
  );

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
        {loading ? (
          <FullLoader spacingTop large />
        ) : (
          images.map((image, i) => (
            <UploadModalImage
              className={styles.image}
              key={image instanceof File ? image.name : image.id}
              image={image}
              width={100}
              height={100}
              uploadParams={uploadParams}
              selectedImages={selectedImages}
              activeImage={activeImage}
              onSelectImage={(image) => {
                if (!(image instanceof File)) {
                  setActiveImage(image);
                  // todo: also set selected image
                }
              }}
            />
          ))
        )}
      </div>
      <UploadImageImage image={activeImage} />
      <button onClick={() => setShow(false)}>close</button>
    </PortalBox>
  );
};

export default UploadModal;
