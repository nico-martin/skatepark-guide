import React from 'react';
import { useIntl } from 'react-intl';
import { Button, LazyImage } from '@theme';
import { ParkI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import styles from './ParkHeader.css';

// todo: readd "love" functionality

const headerHeight = 260;
const titleHeght = 60;
const maxScroll = headerHeight - titleHeght;

const ParkHeader = ({
  park = {},
  scroll,
  className = '',
  edit = false,
}: {
  park: Partial<ParkI>;
  scroll: number;
  className?: string;
  edit?: boolean;
}) => {
  const opacity = React.useMemo(() => {
    const opacity = Math.floor((100 / maxScroll) * scroll) / 100;
    return opacity >= 1 ? 1 : opacity;
  }, [scroll]);

  const logoScale = React.useMemo(() => {
    const min = 0.6;
    const scale = 1 - opacity;
    return scale <= min ? min : scale;
  }, [opacity]);

  const { formatMessage } = useIntl();

  return (
    <header
      className={cn(className, styles.root)}
      data-scrolled={scroll}
      style={{
        //transform: `translateY(-${scroll > maxScroll ? maxScroll : scroll}px)`,
        top: `-${headerHeight - titleHeght}px`,
        height: headerHeight,
      }}
    >
      <div className={cn(styles.title)}>
        {Boolean(park?.logo) && (
          <LazyImage
            image={park.logo}
            width={180}
            height={180}
            className={cn(styles.titleImage)}
            style={{
              transform: `translateY(20%) scale(${logoScale})`,
            }}
          />
        )}
        <p
          className={cn(styles.titleHeading)}
          style={{
            opacity,
            ...(Boolean(park?.logo)
              ? {
                  transform: `translateX(${100 * logoScale * 1.5}px)`,
                  marginLeft: -140,
                }
              : {}),
          }}
        >
          {park.title}
        </p>
      </div>
      <div className={cn(styles.controls)}>
        {/*<Button
          icon={parkLoved ? 'mdi/heart' : 'mdi/heart-empty'}
          className="park-header__control park-header__control-love"
          role="checkbox"
          aria-checked={parkLoved}
          onClick={() => {
            if (parkLoved) {
              //removeLoved([park.slug]);
            } else {
              //setLoved([park.slug]);
            }
          }}
          round
          white
        />*/}
        {'share' in window.navigator && (
          <Button
            icon="mdi/share"
            className={cn(styles.control, styles.controlLove)}
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
                .catch((error) => console.log('Error sharing', error))
            }
            round
            color="white"
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
