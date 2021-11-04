import React from 'react';
import { useIntl } from 'react-intl';
import { FormElement, Iframe, InputText } from '@theme';

const ParkVideo = ({
  videoLink,
  className = '',
  edit,
  onUpdate,
}: {
  videoLink: string;
  className?: string;
  edit: boolean;
  onUpdate: (value: string) => void;
}) => {
  const [link, setLink] = React.useState<string>(videoLink);
  const { formatMessage } = useIntl();

  const videoId = React.useMemo<string>(() => {
    if (!link) {
      return null;
    }
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link.match(regExp);
    return match && match[7].length == 11 ? match[7] : null;
  }, [link]);

  const error = React.useMemo<string>(
    () =>
      !videoId && Boolean(link)
        ? formatMessage({ id: 'park.video.invalid' })
        : null,
    [videoId, link]
  );

  React.useEffect(() => {
    videoId && onUpdate(`https://www.youtube.com/watch?v=${videoId}`);
  }, [videoId]);

  return (
    <div className={className}>
      {edit ? (
        <FormElement
          name="parkvideo"
          Input={InputText}
          label={formatMessage({ id: 'park.video' })}
          onChange={(e) => setLink(String(e))}
          propError={error}
          value={link}
        />
      ) : videoId ? (
        <Iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          frameBorder="0"
          //allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  );
};

export default ParkVideo;
