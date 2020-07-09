import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';

import { actions, parkStates } from '@app/store';

import { Loader, Message } from '@app/theme';

import ParkHeader from '@comp/Park/ParkHeader';
import ParkVideo from '@comp/Park/ParkVideo';
import ParkContact from '@comp/Park/ParkContact';
import ParkWeather from '@comp/Park/ParkWeather';

import './Park.css';

const Park = ({ className = '' }: { className?: string }) => {
  const [scroll, setScroll] = useState<number>(0);
  const { slug } = useParams();
  const { park }: State = useStoreState(['park']);
  const { loadPark } = useActions(actions);

  useEffect(() => {
    loadPark(slug);
    return () => {
      loadPark();
    };
  }, [slug]);

  return (
    <article
      className={`${className} park`}
      // @ts-ignore
      onScroll={e => setScroll(e.target.scrollTop)}
    >
      <ParkHeader className="park__header" park={park.data} scroll={scroll} />
      <h1 className="park__title">{park.data.title}</h1>
      <div className="park__body">
        {park.state === parkStates.LOADING && (
          <Loader className="park__loader" />
        )}
        {park.state === parkStates.ERROR && (
          <Message type="error">error: {park.error}</Message>
        )}
        {park.state === parkStates.SUCCESS && (
          <React.Fragment>
            <ParkVideo videoLink={park.data.video} className="park__video" />
            <div
              className="park__content "
              dangerouslySetInnerHTML={{ __html: park.data.content }}
            />
            <ParkContact
              contacts={park.data.contact}
              className="park__content"
            />
            <ParkWeather className="park__weather" slug={park.data.slug} />
          </React.Fragment>
        )}
      </div>
    </article>
  );
};

export default Park;
