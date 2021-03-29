import React from 'react';
import { Icon } from '@theme';

import './Logo.css';

const Logo = ({ className = '' }: { className?: string }) => (
  <Icon icon="logo-portrait" className={`${className} logo`} />
);

export default Logo;
