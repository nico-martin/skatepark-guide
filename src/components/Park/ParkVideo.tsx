import React from 'react';
import { Iframe } from '@theme';

const ParkVideo = ({
  videoLink,
  className = '',
}: {
  videoLink: string;
  className?: string;
}) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

  const r = regex.exec(videoLink);
  if (r === null || !r[1]) {
    return <React.Fragment />;
  }

  return (
    <div className={className}>
      <Iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${r[1]}`}
        frameBorder="0"
        //allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default ParkVideo;
