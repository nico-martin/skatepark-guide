import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { FormElement, InputText, InputTextarea, Form } from '@theme';
import { ParkContactsI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import styles from './ParkContact.css';

const ParkContact = ({
  contacts = null,
  setContacts,
  className = '',
}: {
  contacts: ParkContactsI;
  setContacts: (contacts: ParkContactsI) => void;
  className?: string;
}) => {
  const form = useForm<ParkContactsI>({
    defaultValues: contacts,
  });
  const { formatMessage } = useIntl();

  const rules = {
    homepage: {
      pattern: {
        value:
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        message: formatMessage({ id: 'park.edit.contact.validate.website' }),
      },
    },
    email: {
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: formatMessage({ id: '_validate.email' }),
      },
    },
    facebook: {
      pattern: {
        value: /^https:\/\/(www\.|)facebook\.com\/.*/,
        message: formatMessage({ id: 'park.edit.contact.validate.facebook' }),
      },
    },
    instagram: {
      pattern: {
        value: /^https:\/\/(www\.|)instagram\.com\/[a-zA-Z0-9\-\_.]*\/$/,
        message: formatMessage({ id: 'park.edit.contact.validate.instagram' }),
      },
    },
  };

  return (
    <Form className={cn(className, styles.root)}>
      <h2>{formatMessage({ id: 'park.edit.contact' })}</h2>
      {Object.entries(contacts || {}).map(([key, value]) => (
        <FormElement
          form={form}
          className={styles.formElement}
          label={formatMessage({ id: `park.edit.contact.${key}` })}
          name={key}
          onBlur={form.handleSubmit((data) => setContacts(data))}
          Input={key === 'address' ? InputTextarea : InputText}
          {...(key in rules ? { rules: rules[key] } : {})}
        />
      ))}
    </Form>
  );
};

export default ParkContact;
