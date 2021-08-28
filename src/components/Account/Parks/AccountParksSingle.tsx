import React from 'react';
import { useIntl } from 'react-intl';
import { LazyImage } from '@theme';
import { ApiParkList } from '@common/auth/types';
import { formatContact } from '@common/utils/parks';
import styles from './AccountParksSingle.css';

const AccountParkSingle = ({ park }: { park: ApiParkList }) => {
  const adress = formatContact('address', park.parksAddress);
  return (
    <div className={styles.root}>
      <LazyImage image={park.image} width={100} height={100} />
      <div>
        <h2>{park.title}</h2>
        <p>
          <a
            href={adress.url}
            dangerouslySetInnerHTML={{ __html: adress.formattedValue }}
            target="_blank"
          />
        </p>
      </div>
    </div>
  );
};

export default AccountParkSingle;
