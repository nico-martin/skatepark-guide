import React from 'react';
import { ApiImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import styles from './UploadImageImage.css';

const UploadImageImage = ({
  image,
  className = '',
}: {
  image: ApiImageI;
  className?: string;
}) => {
  return (
    <div className={cn(styles.root, className)}>{image ? image.url : null}</div>
  );
};

export default UploadImageImage;
