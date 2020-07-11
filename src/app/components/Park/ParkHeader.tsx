import React, { useState, useEffect } from 'react';
import { Park } from '@app/vendor/types';

import './ParkHeader.css';
import { Button, LazyImage } from '@app/theme';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router';

const headerHeight = 260;
const titleHeght = 60;
const maxScroll = headerHeight - titleHeght;

const ParkHeader = ({
  park,
  scroll,
  className = '',
}: {
  park: Partial<Park>;
  scroll: number;
  className?: string;
}) => {
  const [opacity, setOpacity] = useState<number>(0);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const o = Math.round((100 / maxScroll) * scroll) / 100;
    setOpacity(o > 1 ? 1 : o);
  }, [scroll]);

  return (
    <header
      className={`${className} park-header`}
      data-scrolled={scroll}
      style={{
        transform: `translateY(-${scroll > maxScroll ? maxScroll : scroll}px)`,
        height: headerHeight,
      }}
    >
      <p
        className="park-header__title"
        style={{
          opacity,
        }}
      >
        {park.title}
      </p>
      <div className="park-header__controls">
        {'share' in window.navigator && (
          <Button
            icon="mdi/share"
            onClick={() =>
              window.navigator
                .share({
                  title: formatMessage({ id: 'park.share.title' }),
                  text: formatMessage(
                    { id: 'park.share.text' },
                    { parkTitle: park.title }
                  ),
                  url: window.location.href,
                })
                .then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing', error))
            }
            round
            white
          />
        )}
      </div>
      {park.headImage && (
        <LazyImage
          image={park.headImage}
          alt={park.title}
          background
          style={{
            opacity: 1 - opacity,
          }}
        />
      )}
    </header>
  );
};

export default ParkHeader;
