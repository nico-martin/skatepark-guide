import React from 'react';
import { Icon } from '@app/theme';

import './ParkContact.css';
import { nl2br } from '@app/vendor/helpers';

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
  <div className={`${className} park-contact`}>
    {Object.entries(contacts).map(([key, value]) => {
      if (!value) {
        return;
      }

      let url = '';
      let string = value;
      switch (key) {
        case 'email':
          url = 'mailto:' + value;
          break;
        case 'phone':
          url = 'tel:' + value;
          break;
        case 'address':
          url = `https://www.google.com/maps?q=${string}`;
          string = nl2br(string);
          break;
        default:
          const regex = /(https?:\/\/(?:www\.|(?!www))([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))/gm;
          const match = regex.exec(value);
          if (match) {
            url = match[0];
            string = match[2];
          }
      }

      return (
        <div className="park-contact__element">
          <Icon
            className="park-contact__icon"
            icon={`mdi/${
              key in mapIconToContact ? mapIconToContact[key] : 'link'
            }`}
            button
            round
          />
          {url ? (
            <a
              href={url}
              dangerouslySetInnerHTML={{ __html: string }}
              target="_blank"
            />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: string }} />
          )}
        </div>
      );
    })}
  </div>
);

export default ParkContact;
