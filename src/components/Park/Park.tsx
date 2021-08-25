import React from 'react';
import { useParams } from 'react-router-dom';
import { FullLoader, Loader, Message } from '@theme';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import cn from '@common/utils/classnames';
import ParkContact from '@comp/Park/ParkContact';
import ParkGallery from '@comp/Park/ParkGallery';
import ParkHeader from '@comp/Park/ParkHeader';
import ParkVideo from '@comp/Park/ParkVideo';
import ParkWeather from '@comp/Park/ParkWeather';
import styles from './Park.css';

const Park = ({ className = '' }: { className?: string }) => {
  const [scroll, setScroll] = React.useState<number>(0);
  const { slug } = useParams<{ slug: string }>();
  const { data, state, error } = usePark(slug);

  return (
    <article
      className={cn(className, styles.root)}
      onScroll={(e) => setScroll((e.target as HTMLElement).scrollTop)}
    >
      <ParkHeader className={cn(styles.header)} park={data} scroll={scroll} />
      <h1 className={cn(styles.title)}>{data?.title || ''}</h1>
      <main className={styles.main}>
        {state === PARK_API_STATES.LOADING && <FullLoader large spacingTop />}
        {state === PARK_API_STATES.ERROR && (
          <Message type="error">error: {error}</Message>
        )}
        {state === PARK_API_STATES.SUCCESS && (
          <React.Fragment>
            {Boolean(data.video) && (
              <ParkVideo
                videoLink={data.video}
                className={cn(styles.video, styles.contentElement)}
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
