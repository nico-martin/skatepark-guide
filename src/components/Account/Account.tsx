import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { FullLoader } from '@theme';
import { getMe } from '@common/api/auth';
import { AuthWrapper, useAuth } from '@common/auth/authContext';
import { useMe, ME_API_STATES } from '@common/hooks/useMe';
import cn from '@common/utils/classnames';
import AccountSettings from '@comp/Account/AccountSettings';
import styles from './Account.css';

const Account = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { setJwt, isLoggedIn } = useAuth();
  const { state, data, error, reload } = useMe();

  React.useEffect(() => {
    reload();
  }, [isLoggedIn]);

  return (
    <div className={cn(styles.root, className)}>
      <AuthWrapper classNameForm={styles.form}>
        <h1>{formatMessage({ id: 'account.title' })}</h1>
        {state === ME_API_STATES.LOGGED_OUT ? null : state ===
          ME_API_STATES.LOADING ? (
          <FullLoader />
        ) : (
          <React.Fragment>
            <AccountSettings user={data} />
          </React.Fragment>
        )}
      </AuthWrapper>
    </div>
  );
};

export default Account;
