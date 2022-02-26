import React from 'react';
import { useIntl } from 'react-intl';
import { Button, LazyImage } from '@theme';
import { useAppSettings } from '@common/appSettings/appSettingsContext';
import { ApiParkList } from '@common/auth/types';
import { formatContact } from '@common/utils/parks';
import styles from './AccountParksSingle.module.css';

const AccountParkSingle = ({ park }: { park: ApiParkList }) => {
  const adress = formatContact('address', park.parksAddress);
  const { defaultLogo } = useAppSettings();
  const { formatMessage } = useIntl();
  return (
    <div className={styles.root}>
      <LazyImage
        className={styles.image}
        image={park.image ? park.image : defaultLogo}
        width={150}
        height={120}
      />
      <div className={styles.content}>
        <h2>{park.title}</h2>
      </div>
      <div className={styles.controls}>
        <Button
          className={styles.controlElement}
          icon="pencil"
          element="router"
          href={`/parks/edit/${park.slug}`}
          round
          title={formatMessage({ id: 'account.park.edit' })}
          color="white"
        />
        <Button
          className={styles.controlElement}
          icon="eye"
          element="router"
          href={`/parks/${park.slug}`}
          round
          title={formatMessage({ id: 'account.park.view' })}
          color="white"
        />
      </div>
    </div>
  );
};

export default AccountParkSingle;
