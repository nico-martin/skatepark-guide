import React from 'react';
import { Icon } from '@app/theme';

const Logo = ({ className = '' }: { className?: string }) => (
  <Icon icon="logo-portrait" className={className} />
);

export default Logo;
