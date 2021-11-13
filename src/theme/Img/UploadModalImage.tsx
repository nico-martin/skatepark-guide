import React from 'react';
import { LazyImage } from '@theme';
import { ApiImageI, ImageId } from '@common/types/image';
import cn from '@common/utils/classnames';
import UploadImage from './UploadImage';
import styles from './UploadModalImage.css';

const UploadModalImage = ({
  image: imageProp,
  width = 100,
  height = 100,
  uploadParams = {},
  selectedImages,
  activeImage,
  onSelectImage,
  className = '',
}: {
  image: File | ApiImageI;
  width?: number;
  height?: number;
  uploadParams?: Record<string, string>;
  selectedImages: Array<ImageId>;
  activeImage: ApiImageI;
  onSelectImage: (image: ApiImageI) => void;
  className?: string;
}) => {
  const [image, setImage] = React.useState<File | ApiImageI>(imageProp);

  return (
    <button
      className={cn(className, styles.root, {
        [styles.isSelected]:
          !(image instanceof File) && selectedImages.indexOf(image?.id) !== -1,
        [styles.isActive]:
          !(image instanceof File) && activeImage?.id === image.id,
      })}
      disabled={image instanceof File}
      onClick={() => (!(image instanceof File) ? onSelectImage(image) : null)}
    >
      {image instanceof File ? (
        <UploadImage
          className={cn(styles.uploadModal)}
          file={image}
          params={uploadParams}
          onUpload={setImage}
          width={width}
          height={height}
        />
      ) : (
        <LazyImage image={image} width={width} height={height} />
      )}
    </button>
  );
};

export default UploadModalImage;
