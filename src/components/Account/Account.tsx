import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AuthWrapper } from '@common/auth/authContext';
import cn from '@common/utils/classnames';
import styles from './Account.css';

const Account = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={cn(styles.root, className)}>
      <AuthWrapper classNameForm={styles.form}>
        <p>Account</p>
      </AuthWrapper>
    </div>
  );
};

export default Account;
