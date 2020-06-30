import React from 'react';
import { VNode } from 'preact';

import { Link } from 'react-router-dom';
import { useStoreState } from 'unistore-hooks';
import { State } from '@app/store/types';

import {
  leadingSlashIt,
  trailingSlashIt,
  unleadingSlashIt,
} from '@app/vendor/slashit';

const IntlLink = ({
  href,
  ...props
}: {
  href?: string;
  children?: VNode | VNode[] | string;
  [x: string]: any;
}) => {
  const { intlLocale }: State = useStoreState(['intlLocale']);
  return (
    <Link
      {...{
        ...props,
        to: leadingSlashIt(
          trailingSlashIt(intlLocale) + unleadingSlashIt(href)
        ),
        store: false,
      }}
    />
  );
};

export default IntlLink;
