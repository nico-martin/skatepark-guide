import React from 'react';
import { useIntl } from 'react-intl';
import { FormElement, Iframe, InputText } from '@theme';

const ParkVideo = ({
  videoLink,
  className = '',
  setVideoLink,
}: {
  videoLink: string;
  className?: string;
  setVideoLink: (value: string) => void;
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
    if (videoId && setVideoLink) {
      setVideoLink(`https://www.youtube.com/watch?v=${videoId}`);
      setLink(`https://www.youtube.com/watch?v=${videoId}`);
    } else if (!videoId && link === '' && setVideoLink) {
      setVideoLink('');
    }
  }, [videoId]);

  return (
    <div className={className}>
      {setVideoLink ? (
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
