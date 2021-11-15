import React from 'react';
import { useIntl } from 'react-intl';
import { FormElement, InputText } from '@theme';
import { updateImage } from '@common/api/attachment';
import { ApiImageI, ImageCredits } from '@common/types/image';
import cn from '@common/utils/classnames';
import styles from './UploadImageEdit.css';

const UploadImageEdit = ({
  image,
  setImage,
  className = '',
}: {
  image: ApiImageI;
  setImage: (image: ApiImageI) => void;
  className?: string;
}) => {
  const [title, setTitle] = React.useState<string>();
  const [alt, setAlt] = React.useState<string>();
  const [credits, setCredits] = React.useState<ImageCredits>({
    text: '',
    url: '',
  });

  React.useEffect(() => {
    if (image) {
      setTitle(image.title);
      setAlt(image.alt);
      setCredits(image.credits);
    }
  }, [image]);

  const { formatMessage } = useIntl();

  const sync = () => {
    const newImage = { ...image, title, alt, credits };
    setImage(newImage);
    updateImage(newImage);
  };

  return (
    <div className={cn(styles.root, className)}>
      {image ? (
        <div className={styles.form}>
          <FormElement
            name="title"
            Input={InputText}
            label={formatMessage({ id: 'park.edit.upload.imageTitle' })}
            type="stacked"
            onChange={(e) => setTitle(String(e))}
            onBlur={sync}
            value={title}
            small
          />
          <FormElement
            name="altText"
            Input={InputText}
            label={formatMessage({ id: 'park.edit.upload.imageAlt' })}
            type="stacked"
            onChange={(e) => setAlt(String(e))}
            onBlur={sync}
            value={alt}
            small
          />
          <FormElement
            name="credits"
            Input={InputText}
            label={formatMessage({ id: 'park.edit.upload.imageCredits' })}
            type="stacked"
            onChange={(e) => setCredits({ ...credits, text: String(e) })}
            onBlur={sync}
            value={credits.text}
            small
          />
          {credits.text !== '' && (
            <FormElement
              name="creditsUrl"
              Input={InputText}
              label={formatMessage({ id: 'park.edit.upload.imageCreditsUrl' })}
              type="stacked"
              onChange={(e) => setCredits({ ...credits, url: String(e) })}
              onBlur={sync}
              value={credits.url}
              small
            />
          )}
        </div>
      ) : (
        <p className={styles.clickToSelect}>
          {formatMessage({ id: 'park.edit.upload.clickImageHint' })}
        </p>
      )}
    </div>
  );
};

export default UploadImageEdit;
