import React from 'react';
import { useIntl } from 'react-intl';
import { Button, LazyImage, UploadModal } from '@theme';
import { getImages } from '@common/api/park';
import { useAppSettings } from '@common/appSettings/appSettingsContext';
import { ParkI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import { IS_BROWSER } from '@common/utils/helpers';
import styles from './ParkHeader.module.css';

const headerHeight = 260;
const titleHeght = 60;
const maxScroll = headerHeight - titleHeght;

const ParkHeader = ({
  park = {},
  setPark,
  scroll,
  className = '',
  edit = false,
  slug,
}: {
  park: Partial<ParkI>;
  setPark?: (park: Partial<ParkI>) => void;
  scroll: number;
  className?: string;
  edit?: boolean;
  slug: string;
}) => {
  const [showLogoModal, setShowLogoModal] = React.useState<boolean>(false);
  const [showHeroModal, setShowHeroModal] = React.useState<boolean>(false);

  const opacity = React.useMemo(() => {
    const opacity = Math.floor((100 / maxScroll) * scroll) / 100;
    return opacity >= 1 ? 1 : opacity;
  }, [scroll]);

  const { defaultLogo } = useAppSettings();

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
        {!Boolean(park?.logo) && !edit ? null : (
          <div
            className={cn(styles.titleLogo)}
            style={{
              transform: `translateY(20%) scale(${logoScale})`,
            }}
          >
            {edit && (
              <Button
                color="secondary"
                round
                icon="pencil"
                onClick={() => setShowLogoModal(true)}
                className={styles.titleLogoButton}
              />
            )}
            {Boolean(park?.logo) ? (
              <LazyImage
                image={park.logo}
                width={180}
                height={180}
                className={styles.titleLogoImage}
              />
            ) : (
              <LazyImage
                image={defaultLogo}
                width={180}
                height={180}
                className={styles.titleLogoImage}
              />
            )}
          </div>
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
          {park?.title}
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
        {IS_BROWSER && 'share' in window.navigator && !edit && park && (
          <Button
            icon="share"
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
        {park?.canEdit && !edit && (
          <Button
            icon="pencil"
            className={cn(styles.control, styles.controlLove)}
            element="router"
            href={`/park/edit/${park.slug}`}
            round
            color="white"
          />
        )}
      </div>
      {edit && (
        <Button
          color="secondary"
          round
          icon="pencil"
          onClick={() => setShowHeroModal(true)}
          className={styles.heroButton}
        />
      )}
      {park?.headImage && (
        <LazyImage
          image={park.headImage}
          alt={park.title}
          background
          style={{
            opacity: 1 - opacity,
          }}
        />
      )}
      {edit && (
        <React.Fragment>
          <UploadModal
            show={showLogoModal}
            setShow={setShowLogoModal}
            getImages={!slug ? null : () => getImages(slug)}
            uploadParams={{ parkSlug: slug }}
            onSelectImages={(images) =>
              setPark({
                logo: images.length === 1 ? images[0] : null,
              })
            }
            selectedImages={[park?.logo]}
          />
          <UploadModal
            show={showHeroModal}
            setShow={setShowHeroModal}
            getImages={!slug ? null : () => getImages(slug)}
            uploadParams={{ parkSlug: slug }}
            onSelectImages={(images) =>
              setPark({
                headImage: images.length === 1 ? images[0] : null,
              })
            }
            selectedImages={[park?.headImage]}
          />
        </React.Fragment>
      )}
    </header>
  );
};

export default ParkHeader;
