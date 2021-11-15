import React from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import {
  FullLoader,
  PortalBox,
  SHADOW_BOX_SIZES,
  Button,
  ButtonGroup,
} from '@theme';
import { ApiImageI, ImageId, ListImageI, ListFileI } from '@common/types/image';
import DropZone from './DropZone';
import UploadImageEdit from './UploadImageEdit';
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
  const [images, setImages] = React.useState<Array<ListImageI | ListFileI>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeImage, setActiveImage] = React.useState<ApiImageI>(null);
  const [selectedImages, setSelectedImages] = React.useState<Array<ImageId>>(
    initialSelectedImages
  );

  const { formatMessage } = useIntl();

  // todo: ich muss einen besseren weg finden, die bilder anzuordnen, so dass ich sie einzeln updaten kann egal ob File oder ApiImageI (Array mit append [fixe reihenfolge])

  React.useEffect(() => {
    if (getImages && show) {
      setLoading(true);
      getImages()
        .then((images) =>
          setImages(
            images.map((image) => ({ ...image, listKey: String(image.id) }))
          )
        )
        .finally(() => setLoading(false));
    }
  }, [show]);

  const setImage = (image: ListImageI): void =>
    setImages((images) =>
      images.map((i) => (i.listKey !== image.listKey ? i : image))
    );

  return (
    <PortalBox
      show={show}
      setShow={setShow}
      size={SHADOW_BOX_SIZES.LARGE}
      title={title}
    >
      <div className={styles.root}>
        <DropZone
          className={styles.dropzone}
          id="upload-images"
          onChange={(files) =>
            setImages((images) => [
              ...Array.from(files).map((file) => ({
                listKey: uuidv4(),
                file,
              })),
              ...images,
            ])
          }
          height={images.length === 0 && !loading ? 300 : 100}
        />
        {loading ? (
          <FullLoader className={styles.loader} spacingTop large />
        ) : (
          <React.Fragment>
            <div className={styles.images}>
              {images.map((image, i) => (
                <UploadModalImage
                  className={styles.image}
                  key={image.listKey}
                  image={image}
                  setImage={setImage}
                  width={80}
                  height={80}
                  uploadParams={uploadParams}
                  selectedImages={selectedImages}
                  activeImage={activeImage}
                  onSelectImage={(image) => {
                    if (image.url) {
                      setActiveImage(image);
                      // todo: also set selected image
                    }
                  }}
                />
              ))}
            </div>
            {images.length !== 0 && (
              <UploadImageEdit
                image={activeImage}
                setImage={setImage}
                className={styles.imageEdit}
              />
            )}
            <ButtonGroup className={styles.controls} align="right">
              <Button color="white" onClick={() => setShow(false)}>
                {formatMessage({ id: '_close' })}
              </Button>
              <Button
                color="primary"
                disabled={selectedImages.length === 0}
                onClick={() => setShow(false)}
              >
                {formatMessage({ id: 'park.edit.upload.selectImage' })}
              </Button>
            </ButtonGroup>
          </React.Fragment>
        )}
      </div>
    </PortalBox>
  );
};

export default UploadModal;
