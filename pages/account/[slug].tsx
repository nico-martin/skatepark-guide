import React from 'react';
import { useIntl } from 'react-intl';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Menu, Button, MESSAGE_TYPES, Message, FullLoader } from '@theme';
import AccountParks from '@components/Account/AccountParks';
import AccountSettings from '@components/Account/AccountSettings';
import { AuthWrapper, useAuth } from '@common/auth/authContext';
import { useMe, ME_API_STATES } from '@common/hooks/useMe';
import cn from '@common/utils/classnames';
import { PROFILE_MENU } from '@common/utils/constants';
import contentStyles from '../content.module.css';
import styles from './account.module.css';

const Account: NextPage<{ className?: string }> = ({ className = '' }) => {
  const {
    query: { slug },
  } = useRouter();

  const { formatMessage } = useIntl();
  const { setJwt } = useAuth();
  const { state, data, error } = useMe();

  const activeMenuElement = React.useMemo(
    () => (slug === 'parks' ? 'parks' : 'profile'),
    [slug]
  );

  return (
    <div className={cn(styles.root, contentStyles.root, className)}>
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
          <Button onClick={() => setJwt(null)} color="white" round>
            {formatMessage({ id: 'auth.logout' })}
          </Button>
        </header>
        {state === ME_API_STATES.ERROR && (
          <Message type={MESSAGE_TYPES.ERROR}>{error}</Message>
        )}
        {state === ME_API_STATES.LOGGED_OUT ? (
          <React.Fragment />
        ) : state === ME_API_STATES.LOADING ? (
          <FullLoader large spacingTop />
        ) : (
          state === ME_API_STATES.SUCCESS &&
          (activeMenuElement === 'parks' ? (
            <AccountParks user={data} className={styles.content} />
          ) : (
            <AccountSettings user={data} className={styles.content} />
          ))
        )}
      </AuthWrapper>
    </div>
  );
};

export default Account;
