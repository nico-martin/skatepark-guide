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
  const { activeLocale } = useLocale();
  const link: string = React.useMemo(
    () =>
      leadingSlashIt(trailingSlashIt(activeLocale) + unleadingSlashIt(href)),
    [activeLocale, href]
  );
  // @ts-ignore
  return <Link to={link} {...props} />;
};

export default IntlLink;
