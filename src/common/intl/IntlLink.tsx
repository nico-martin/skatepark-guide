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
  const link: string = React.useMemo(
    () => leadingSlashIt(trailingSlashIt(locale) + unleadingSlashIt(href)),
    [locale, href]
  );
  // @ts-ignore
  return <Link to={link} {...props} />;
};

export default IntlLink;
