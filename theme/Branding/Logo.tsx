import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Logo.module.css';

const Logo = ({ className = '' }: { className?: string }) => (
  <Icon icon="logo" className={cn(className, styles.logo)} />
);

export default Logo;
