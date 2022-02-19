import React from 'react';
import { useIntl } from 'react-intl';
import { Message, MESSAGE_TYPES } from '@theme';
import { ApiGetUserI } from '@common/auth/types';
import cn from '@common/utils/classnames';
import styles from './AccountParks.module.css';
import AccountParkSingle from './Parks/AccountParksSingle';

const AccountParks = ({
  className = '',
  user,
}: {
  className?: string;
  user: ApiGetUserI;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={cn(className, styles.root)}>
      {user.parks.length === 0 ? (
        <Message type={MESSAGE_TYPES.WARNING}>
          {formatMessage({ id: 'park.overview.empty' })}
        </Message>
      ) : (
        <ul className={styles.list}>
          {user.parks.map((park) => (
            <li key={park.slug} className={styles.listElement}>
              <AccountParkSingle park={park} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountParks;
