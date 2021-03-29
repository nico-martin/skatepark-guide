import React from 'react';
import { Link } from 'react-router-dom';

import {
  leadingSlashIt,
  trailingSlashIt,
  unleadingSlashIt,
} from '@common/utils/helpers';

import { useLocale } from './intlContext';

const IntlLink = ({
  href,
  ...props
}: {
  href?: string;
  children?: any;
  [x: string]: any;
}) => {
  const { locale } = useLocale();
  return (
    <Link
      {...{
        ...props,
        to: leadingSlashIt(trailingSlashIt(locale) + unleadingSlashIt(href)),
        store: false,
      }}
    />
  );
};

export default IntlLink;
