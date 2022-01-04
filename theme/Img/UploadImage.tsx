import React from 'react';
import { Loader } from '@theme';
import { postImage } from '@common/api/attachment';
import { ApiImageI, ListFileI, ListImageI } from '@common/types/image';
import cn from '@common/utils/classnames';
import styles from './UploadImage.module.css';

const UploadImage = ({
  file,
  params = {},
  onUpload,
  className = '',
  width = 100,
  height = 100,
}: {
  file: ListFileI;
  params?: Record<string, string>;
  onUpload: (image: ListImageI) => void;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    postImage(file.file, params)
      .then((r) => onUpload({ ...r, listKey: file.listKey }))
      .catch((e) => console.log('ERROR', e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={cn(className, styles.root)} style={{ width, height }}>
      <Loader className={styles.loader} />
    </div>
  );
};

export default UploadImage;
