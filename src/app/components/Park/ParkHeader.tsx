import React from 'react';
import { Park } from '@app/vendor/types';

import './ParkHeader.css';
import { LazyImage } from '@app/theme';

const ParkHeader = ({
  park,
  className = '',
}: {
  park: Partial<Park>;
  className?: string;
}) => (
  <header className={`${className} park-header`}>
    <h1 className="park-header__title">{park.title}</h1>
    {park.headImage && (
      <LazyImage image={park.headImage} alt={park.title} background />
    )}
  </header>
);

export default ParkHeader;
