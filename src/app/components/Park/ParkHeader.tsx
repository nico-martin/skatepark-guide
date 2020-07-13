import React, { useState, useEffect } from 'react';
import { useStoreState, useActions } from 'unistore-hooks';

import { Park } from '@app/vendor/types';

import './ParkHeader.css';
import { Button, LazyImage } from '@app/theme';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import { State } from '@app/store/types';
import { actions } from '@app/store';

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
  const [parkLoved, setParkLoved] = useState<boolean>(false);

  const { formatMessage } = useIntl();
  const { loved }: State = useStoreState(['loved']);
  const { setLoved, removeLoved } = useActions(actions);

  useEffect(() => {
    const o = Math.round((100 / maxScroll) * scroll) / 100;
    setOpacity(o > 1 ? 1 : o);
  }, [scroll]);

  useEffect(() => {
    setParkLoved(loved.indexOf(park.slug) !== -1);
  }, [loved, park]);

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
        <Button
          icon={parkLoved ? 'mdi/heart' : 'mdi/heart-empty'}
          className="park-header__control park-header__control-love"
          role="checkbox"
          aria-checked={parkLoved}
          onClick={() => {
            if (parkLoved) {
              removeLoved([park.slug]);
            } else {
              setLoved([park.slug]);
            }
          }}
          round
          white
        />
        {'share' in window.navigator && (
          <Button
            icon="mdi/share"
            className="park-header__control park-header__control-share"
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
