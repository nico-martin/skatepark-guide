import React from 'react';
import { NextPage } from 'next';
import AccountPage from './account/[slug]';

const Account: NextPage<{ className?: string }> = (props) => (
  <AccountPage {...props} />
);

export default Account;
