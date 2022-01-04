import React from 'react';
import type { NextPage } from 'next';
import cn from '@common/utils/classnames';
import contentStyles from './content.module.css';

const Custom404: NextPage<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={cn(className, contentStyles.root)}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default Custom404;
