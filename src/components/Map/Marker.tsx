import React from 'react';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import styles from './Marker.css';

const Marker = ({
  name,
  slug,
  small = false,
}: {
  name: string;
  lat: number;
  lng: number;
  slug: string;
  small?: boolean;
}) => {
  return (
    <IntlLink
      href={`park/${slug}/`}
      className={cn(styles.root, { [styles.isSmall]: small })}
      title={name}
    />
  );
};

export default Marker;
