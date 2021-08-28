import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import { nl2br } from '@common/utils/helpers';
import { formatContact } from '@common/utils/parks';
import styles from './ParkContact.css';

const mapIconToContact = {
  homepage: 'link',
  email: 'at',
  phone: 'phone',
  facebook: 'facebook',
  address: 'home',
};

const ParkContact = ({
  contacts,
  className = '',
}: {
  contacts: {
    [key: string]: string;
  };
  className?: string;
}) => (
  <div className={cn(className, styles.root)}>
    {Object.entries(contacts).map(([key, value]) => {
      if (!value) {
        return;
      }

      const { url, formattedValue } = formatContact(key, value);

      return (
        <div className={cn(styles.element)}>
          <Icon
            className={cn(styles.icon)}
            icon={`mdi/${
              key in mapIconToContact ? mapIconToContact[key] : 'link'
            }`}
            button
            round
          />
          {url ? (
            <a
              href={url}
              dangerouslySetInnerHTML={{ __html: formattedValue }}
              target="_blank"
            />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
          )}
        </div>
      );
    })}
  </div>
);

export default ParkContact;
