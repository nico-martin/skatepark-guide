import React from 'react';
import Link from 'next/link';

const IntlLink = ({
  href,
  children,
  ...props
}: {
  href?: string;
  children?: any;
  [x: string]: any;
}) => (
  <Link href={href}>
    <a {...props}>{children}</a>
  </Link>
);

export default IntlLink;
