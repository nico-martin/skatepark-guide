import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  Form,
  FormControls,
  FormElement,
  InputSelect,
  InputText,
  InputTextarea,
  Message,
} from '@theme';
import { getMe, postLogin, updateMe } from '@common/api/auth';
import { AuthWrapper, useAuth } from '@common/auth/authContext';
import { ApiGetUserI } from '@common/auth/types';
import cn from '@common/utils/classnames';
import styles from './AccountSettings.module.css';

const AccountSettings = ({
  className = '',
  user,
}: {
  className?: string;
  user: ApiGetUserI;
}) => {
  const { formatMessage } = useIntl();
  const { isLoggedIn, email } = useAuth();
  const [pending, setPending] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string>('');

  const form = useForm<{
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_url: string;
    sportart: string;
    description: string;
  }>({
    defaultValues: {
      user_email: user.user_email,
      user_firstname: user.user_firstname,
      user_lastname: user.user_lastname,
      user_url: user.user_url,
      sportart: user.sportart,
      description: user.description,
    },
  });

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      {formError && <Message className={styles.error}>{formError}</Message>}
      <Form
        onSubmit={form.handleSubmit((data) => {
          setPending(true);
          updateMe(data)
            .then(() => {})
            .catch((e) => {
              setFormError(e.message);
            })
            .finally(() => setPending(false));
        })}
      >
        <FormElement
          name="user_email"
          Input={InputText}
          label={formatMessage({ id: 'account.email' })}
          form={form}
          disabled
        />
        <FormElement
          name="user_firstname"
          Input={InputText}
          label={formatMessage({ id: 'account.firstname' })}
          form={form}
        />
        <FormElement
          name="user_lastname"
          Input={InputText}
          label={formatMessage({ id: 'account.lastname' })}
          form={form}
        />
        <FormElement
          name="user_url"
          Input={InputText}
          label={formatMessage({ id: 'account.website' })}
          form={form}
        />
        <FormElement
          name="sportart"
          Input={InputSelect}
          label={formatMessage({ id: 'account.sport' })}
          form={form}
          options={{
            all: formatMessage({ id: 'account.sport.all' }),
            skateboard: formatMessage({ id: 'account.sport.skateboard' }),
            inline: formatMessage({ id: 'account.sport.inline' }),
            scooter: formatMessage({ id: 'account.sport.scooter' }),
          }}
        />
        <FormElement
          name="description"
          Input={InputTextarea}
          label={formatMessage({ id: 'account.description' })}
          form={form}
        />
        <FormControls isLoading={pending} />
      </Form>
    </div>
  );
};

export default AccountSettings;
