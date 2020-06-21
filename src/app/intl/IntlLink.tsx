import React from 'react';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { Actions, State } from '@app/store/types';

import {
  leadingSlashIt,
  trailingSlashIt,
  unleadingSlashIt,
} from '@app/vendor/slashit';

const IntlLink = ({
  href,
  test,
  intlLocale,
  ...props
}: {
  href: string;
  test: string;
  children: string;
  intlLocale: string;
}) => (
  <Link
    {...{
      ...props,
      href: leadingSlashIt(
        trailingSlashIt(intlLocale) + unleadingSlashIt(href)
      ),
      store: false,
    }}
  />
);

export default connect<any, {}, State, Actions>(['intlLocale'])(IntlLink);
