import React from 'react';
import { postAttachment } from '@common/api/attachment';
import { API } from '@common/utils/constants';

const UploadImage = ({
  file,
  width = 100,
  height = 100,
  params = {},
}: {
  file: File;
  width?: number;
  height?: number;
  params?: Record<string, string>;
}) => {
  React.useEffect(() => {
    postAttachment(file, params)
      .then((r) => console.log(r))
      .catch((e) => console.log('ERROR', e));
  }, []);
  return <p>{file.name}</p>;
};

export default UploadImage;
