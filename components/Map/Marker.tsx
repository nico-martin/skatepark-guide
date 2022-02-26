import React from 'react';
import Link from 'next/link';
import cn from '@common/utils/classnames';
import styles from './Marker.module.css';

const Marker = ({
  name,
  slug,
  small = false,
}: {
  name: string;
  lat: number;
  lng: number;
  slug?: string;
  small?: boolean;
}) => {
  return slug ? (
    <Link href={`/parks/${slug}/`}>
      <a
        className={cn(styles.root, { [styles.isSmall]: small })}
        title={name}
      />
    </Link>
  ) : (
    <span
      className={cn(styles.root, styles.user, { [styles.isSmall]: small })}
      title={name}
    />
  );
};

export default Marker;
