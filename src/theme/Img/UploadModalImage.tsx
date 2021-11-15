import React from 'react';
import { LazyImage } from '@theme';
import { ApiImageI, ImageId, ListFileI, ListImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import UploadImage from './UploadImage';
import styles from './UploadModalImage.css';

const UploadModalImage = ({
  image,
  setImage,
  width = 100,
  height = 100,
  uploadParams = {},
  selectedImages,
  activeImage,
  onSelectImage,
  className = '',
}: {
  image: ListFileI | ListImageI;
  setImage: (image: ApiImageI) => void;
  width?: number;
  height?: number;
  uploadParams?: Record<string, string>;
  selectedImages: Array<ImageId>;
  activeImage: ApiImageI;
  onSelectImage: (image: ApiImageI) => void;
  className?: string;
}) => {
  //const [image, setImage] = React.useState<File | ApiImageI>(imageProp);

  return (
    <button
      className={cn(className, styles.root, {
        [styles.isSelected]:
          'id' in image && selectedImages.indexOf(image.id) !== -1,
        [styles.isActive]: 'id' in image && activeImage?.id === image.id,
      })}
      disabled={!('url' in image)}
      onClick={() => ('url' in image ? onSelectImage(image) : null)}
    >
      {'id' in image ? (
        <LazyImage image={image} width={width} height={height} />
      ) : (
        <UploadImage
          className={cn(styles.uploadModal)}
          file={image}
          params={uploadParams}
          onUpload={setImage}
          width={width}
          height={height}
        />
      )}
    </button>
  );
};

export default UploadModalImage;
