import React from 'react';
import { Button, icons } from '@theme';
import cn from '@common/utils/classnames';
import styles from './MapControls.module.css';

const MapControls = ({
  className = '',
  setMapZoom,
}: {
  className?: string;
  setMapZoom: (zoom: number | ((zoom: number) => number)) => void;
}) => (
  <div className={cn(className, styles.root)}>
    <Button
      className={styles.plus}
      onClick={() => setMapZoom((zoom) => zoom + 1)}
      icon="plus"
      color="white"
    />
    <Button
      className={styles.minus}
      onClick={() => setMapZoom((zoom) => zoom - 1)}
      icon="minus"
      color="white"
    />
  </div>
);

export default MapControls;
