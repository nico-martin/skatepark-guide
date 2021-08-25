import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Logo.css';

const Logo = ({ className = '' }: { className?: string }) => (
  <Icon icon="logo-portrait" className={cn(className, styles.logo)} />
);

export default Logo;
