import React from 'react';
import { useParams } from 'react-router-dom';
import { FullLoader, LazyImage, Loader, Message } from '@theme';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import cn from '@common/utils/classnames';
import ParkContact from '@comp/Park/ParkContact';
import ParkGallery from '@comp/Park/ParkGallery';
import ParkHeader from '@comp/Park/ParkHeader';
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
  const { data, state, error, setPark, hasUnsavedChanges } = usePark(slug);

  return (
    <article
      className={cn(className, styles.root)}
      onScroll={(e) => setScroll((e.target as HTMLElement).scrollTop)}
    >
      <ParkHeader
        className={cn(styles.header)}
        park={data}
        scroll={scroll}
        edit={edit}
      />
      <div className={cn(styles.title)}>
        {edit ? (
          <input
            className={cn(styles.titleEdit)}
            type="text"
            placeholder="Title"
            value={data?.title || ''}
            onChange={(e) =>
              setPark({
                title: (e.target as HTMLInputElement).value,
              })
            }
          />
        ) : (
          <h1>{data?.title || ''}</h1>
        )}
      </div>
      <main className={styles.main}>
        {state === PARK_API_STATES.LOADING && <FullLoader large spacingTop />}
        {state === PARK_API_STATES.ERROR && (
          <Message type="error">error: {error}</Message>
        )}
        {state === PARK_API_STATES.SUCCESS && (
          <React.Fragment>
            {(edit || Boolean(data.video)) && (
              <ParkVideo
                videoLink={data.video}
                className={cn(styles.video, styles.contentElement)}
                edit={edit}
                onUpdate={(value) =>
                  setPark({
                    video: value,
                  })
                }
              />
            )}
            {Boolean(data.gallery) && (
              <ParkGallery
                className={cn(styles.gallery, styles.contentElement)}
                images={data.gallery}
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
            <ParkWeather
              className={cn(styles.weather, styles.contentElement)}
              slug={data.slug}
            />
          </React.Fragment>
        )}
      </main>
    </article>
  );
};

export default Park;
