import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Button, FullLoader, LazyImage, Loader, Message } from '@theme';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import cn from '@common/utils/classnames';
import ParkContact from '@comp/Park/ParkContact';
import ParkGallery from '@comp/Park/ParkGallery';
import ParkHeader from '@comp/Park/ParkHeader';
import ParkTitle from '@comp/Park/ParkTitle';
import ParkVideo from '@comp/Park/ParkVideo';
import ParkWeather from '@comp/Park/ParkWeather';
import styles from './Park.css';

const Park = ({
  className = '',
  edit,
}: {
  className?: string;
  edit?: boolean;
}) => {
  const [scroll, setScroll] = React.useState<number>(0);
  const { slug } = useParams<{ slug: string }>();
  const { data, state, error, setPark, hasUnsavedChanges, updatePark } =
    usePark(slug);
  const { formatMessage } = useIntl();
  const isEdtitable: boolean = edit && data?.canEdit;

  return (
    <article
      className={cn(className, styles.root)}
      onScroll={(e) => setScroll((e.target as HTMLElement).scrollTop)}
    >
      <ParkHeader
        className={cn(styles.header)}
        park={data}
        scroll={scroll}
        edit={isEdtitable}
      />
      <ParkTitle
        title={data?.title || ''}
        setTitle={
          isEdtitable
            ? (title) =>
                setPark({
                  title,
                })
            : null
        }
        className={cn(styles.title)}
      />
      <main className={styles.main}>
        {state === PARK_API_STATES.LOADING ? (
          <FullLoader large spacingTop />
        ) : state === PARK_API_STATES.ERROR ? (
          <div className={cn(styles.contentElement)}>
            <Message type="error">error: {error}</Message>
          </div>
        ) : edit && !data.canEdit ? (
          <div className={cn(styles.contentElement)}>
            <Message type="error">
              {formatMessage({ id: 'park.edit.permission' })}
            </Message>
          </div>
        ) : (
          <React.Fragment>
            {(edit || Boolean(data.video)) && (
              <ParkVideo
                className={cn(styles.video, styles.contentElement)}
                videoLink={data.video}
                setVideoLink={
                  isEdtitable
                    ? (value) =>
                        setPark({
                          video: value,
                        })
                    : null
                }
              />
            )}
            {Boolean(data.gallery) && (
              <ParkGallery
                className={cn(styles.gallery, styles.contentElement)}
                images={data.gallery}
                setImages={
                  isEdtitable
                    ? (gallery) =>
                        setPark({
                          gallery,
                        })
                    : null
                }
              />
            )}
            {Boolean(data.content) && (
              <div
                className={cn(styles.content, styles.contentElement)}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
            {Object.keys(data.contact).length !== 0 && (
              <ParkContact
                contacts={data.contact || {}}
                className={cn(styles.contact, styles.contentElement)}
              />
            )}
            {!edit && (
              <ParkWeather
                className={cn(styles.weather, styles.contentElement)}
                slug={data.slug}
              />
            )}
            {edit && (
              <div className={cn(styles.contentElement)}>
                <Button
                  disabled={
                    state === PARK_API_STATES.UPDATING || !hasUnsavedChanges
                  }
                  isLoading={state === PARK_API_STATES.UPDATING}
                  onClick={updatePark}
                >
                  {formatMessage({ id: 'park.edit.saveChanges' })}
                </Button>
              </div>
            )}
          </React.Fragment>
        )}
      </main>
    </article>
  );
};

export default Park;
