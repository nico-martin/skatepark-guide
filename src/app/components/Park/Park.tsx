import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';

import { actions, parkStates } from '@app/store';
import ParkHeader from '@comp/Park/ParkHeader';
import ParkVideo from '@comp/Park/ParkVideo';

import './Park.css';

const Park = () => {
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
    <article className="park">
      <ParkHeader className="park__header" park={park.data} />
      <h1 className="park__title">{park.data.title}</h1>
      {park.state === parkStates.LOADING && <p>loading..</p>}
      {park.state === parkStates.ERROR && <p>error: {park.error}</p>}
      {park.state === parkStates.SUCCESS && (
        <div className="park__body">
          <ParkVideo videoLink={park.data.video} className="park__video" />
          <div
            className="park__content "
            dangerouslySetInnerHTML={{ __html: park.data.content }}
          />
        </div>
      )}
    </article>
  );
};

export default Park;
