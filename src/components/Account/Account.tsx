import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Button, FullLoader, Menu, Message, MESSAGE_TYPES } from '@theme';
import { AuthWrapper, useAuth } from '@common/auth/authContext';
import { useMe, ME_API_STATES } from '@common/hooks/useMe';
import cn from '@common/utils/classnames';
import { PROFILE_MENU } from '@common/utils/constants';
import AccountParks from '@comp/Account/AccountParks';
import AccountSettings from '@comp/Account/AccountSettings';
import styles from './Account.css';

const Account = ({ className = '' }: { className?: string }) => {
  const { slug } = useParams<{ slug: string }>();
  const { formatMessage } = useIntl();
  const { setJwt } = useAuth();
  const { state, data, error } = useMe();

  const activeMenuElement = React.useMemo(
    () => (slug === 'parks' ? 'parks' : 'profile'),
    [slug]
  );

  return (
    <div className={cn(styles.root, className)}>
      <AuthWrapper classNameForm={styles.form}>
        <Menu
          className={styles.navigation}
          menu={Object.entries(PROFILE_MENU).reduce(
            (acc, [key, slug]) => ({
              ...acc,
              [slug]: {
                title: formatMessage({ id: `auth.menu.${key}` }),
                active: key === activeMenuElement,
              },
            }),
            {}
          )}
        />
        <header className={styles.header}>
          <h1 className={styles.title}>
            {slug === 'parks'
              ? formatMessage({ id: 'account.myparks' })
              : formatMessage({ id: 'account.title' })}
          </h1>
          <Button onClick={() => setJwt(null)} white round>
            {formatMessage({ id: 'auth.logout' })}
          </Button>
        </header>
        {state === ME_API_STATES.ERROR && (
          <Message type={MESSAGE_TYPES.ERROR}>{error}</Message>
        )}
        {state === ME_API_STATES.LOGGED_OUT || !Boolean(data) ? null : state ===
          ME_API_STATES.LOADING ? (
          <FullLoader />
        ) : slug === 'parks' ? (
          <AccountParks user={data} className={styles.content} />
        ) : (
          <AccountSettings user={data} className={styles.content} />
        )}
      </AuthWrapper>
    </div>
  );
};

export default Account;
