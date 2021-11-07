import React from 'react';
import cn from '@common/utils/classnames';
import styles from './ParkTitle.css';

const ParkTitle = ({
  title,
  setTitle,
  className = '',
}: {
  title: string;
  setTitle: (title: string) => void;
  className?: string;
}) => (
  <div className={cn(className, styles.root)}>
    {setTitle ? (
      <input
        className={cn(styles.titleEdit)}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
    ) : (
      <h1>{title}</h1>
    )}
  </div>
);

export default ParkTitle;
