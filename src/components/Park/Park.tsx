import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader, Message } from '@theme';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import cn from '@common/utils/classnames';
import ParkContact from '@comp/Park/ParkContact';
import ParkGallery from '@comp/Park/ParkGallery';
//import { getPark } from '@common/vendor/api/spg';
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
      <div className={cn(styles.content)}>
        {state === PARK_API_STATES.LOADING && (
          <Loader className={cn(styles.loader)} />
        )}
        {state === PARK_API_STATES.ERROR && (
          <Message type="error">error: {error}</Message>
        )}
        {state === PARK_API_STATES.SUCCESS && (
          <React.Fragment>
            <ParkVideo videoLink={data.video} className={cn(styles.video)} />
            {Boolean(data.gallery) && (
              <ParkGallery className={styles.gallery} images={data.gallery} />
            )}
            <div
              className={cn(styles.content)}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            {/*<ParkContact
              contacts={data.contact || {}}
              className='park__content'
            />*/}
            <ParkWeather className={cn(styles.weather)} slug={data.slug} />
          </React.Fragment>
        )}
      </div>
    </article>
  );
};

export default Park;
