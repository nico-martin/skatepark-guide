import React from 'react';
import { useIntl } from 'react-intl';
import type { NextPage } from 'next';
import cn from '@common/utils/classnames';
import contentStyles from './content.module.css';
import styles from './page.module.css';

const Custom404: NextPage<{ className?: string }> = ({ className = '' }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={cn(className, contentStyles.root)}>
      <h1 className={styles.title}>{formatMessage({ id: '404.title' })}</h1>
      <div className={styles.content}>
        <p>{formatMessage({ id: '404.desc' })}</p>
      </div>
    </div>
  );
};

export default Custom404;
