import React from 'react';
import { LazyImage } from '@theme';
import { ListFileI, ListImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import InputCheckbox from '../Form/InputCheckbox';
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
  selectMultiple = false,
  onClickImage,
  onSelectImage,
  className = '',
}: {
  image: ListFileI | ListImageI;
  setImage: (image: ListImageI) => void;
  width?: number;
  height?: number;
  uploadParams?: Record<string, string>;
  selectedImages: Array<ListImageI>;
  activeImage: ListImageI;
  selectMultiple?: boolean;
  onClickImage: (image: ListImageI) => void;
  onSelectImage: (image: ListImageI) => void;
  className?: string;
}) => {
  const isSelected = Boolean(
    selectedImages.find((i) => i.listKey === image.listKey)
  );

  return (
    <div
      className={cn(className, styles.root, {
        [styles.isSelected]: isSelected && !selectMultiple,
        [styles.isActive]: 'id' in image && activeImage?.id === image.id,
      })}
    >
      {selectMultiple && (
        <InputCheckbox
          name={`image-${image.listKey}`}
          className={styles.checkbox}
          value={isSelected ? 'true' : ''}
          onChange={(e) => 'url' in image && onSelectImage(image)}
        />
      )}
      <button
        className={cn(styles.button, {
          [styles.isSelected]: isSelected,
          [styles.isActive]: 'id' in image && activeImage?.id === image.id,
        })}
        disabled={!('url' in image)}
        onClick={() => {
          if ('url' in image) {
            !selectMultiple && onSelectImage(image);
            onClickImage(image);
          }
        }}
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
    </div>
  );
};

export default UploadModalImage;
