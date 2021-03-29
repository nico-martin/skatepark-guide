import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader, Message } from '@theme';
import { useApi, states as parkStates } from '@common/hooks/useApi';
//import { getPark } from '@common/vendor/api/spg';

import ParkHeader from '@comp/Park/ParkHeader';
import ParkVideo from '@comp/Park/ParkVideo';
import ParkGallery from '@comp/Park/ParkGallery';
import ParkContact from '@comp/Park/ParkContact';
import ParkWeather from '@comp/Park/ParkWeather';

import './Park.css';

const Park = ({ className = '' }: { className?: string }) => {
  const [scroll, setScroll] = React.useState<number>(0);
  const { slug } = useParams();
  const { data = {}, state, error } = {
    data: {
      title: 's',
      video: 's',
      content: 's',
      slug: 's',
    },
    state: 'test',
    error: 'test',
  };

  return (
    <article
      className={`${className} park`}
      // @ts-ignore
      onScroll={(e) => setScroll(e.target.scrollTop)}
    >
      <ParkHeader className="park__header" park={data} scroll={scroll} />
      <h1 className="park__title">{data.title || ''}</h1>
      <div className="park__body">
        {state === parkStates.LOADING && <Loader className="park__loader" />}
        {state === parkStates.ERROR && (
          <Message type="error">error: {error}</Message>
        )}
        {state === parkStates.SUCCESS && (
          <React.Fragment>
            <ParkVideo videoLink={data.video} className="park__video" />
            {/*<ParkGallery className='park__video' images={data.gallery} />*/}
            <div
              className="park__content "
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            {/*<ParkContact
              contacts={data.contact || {}}
              className='park__content'
            />*/}
            <ParkWeather className="park__weather" slug={data.slug} />
          </React.Fragment>
        )}
      </div>
    </article>
  );
};

export default Park;
