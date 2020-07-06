import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';

import { actions } from '@app/store';
import ParkHeader from '@comp/Park/ParkHeader';

import './Park.css';

const Park = () => {
  const { slug } = useParams();
  const { currentPark: park }: State = useStoreState(['currentPark']);
  const { loadPark, resetPark } = useActions(actions);

  useEffect(() => {
    loadPark(slug);
    return () => {
      resetPark();
    };
  }, []);

  return (
    <article className="park">
      <ParkHeader className="park__header" park={park} />
    </article>
  );
};

export default Park;
