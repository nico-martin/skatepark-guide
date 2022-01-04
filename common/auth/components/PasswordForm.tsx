import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  Form,
  FormControls,
  FormElement,
  InputText,
  MESSAGE_TYPES,
  Message,
  FormFeedback,
} from '@theme';
import { postPasswordReset } from '@common/api/auth';
import cn from '@common/utils/classnames';
import styles from './Form.module.css';

const PasswordForm = ({ className = '' }: { className?: string }) => {
  const { formatMessage, locale } = useIntl();
  const [pending, setPending] = React.useState<boolean>(false);
  const [formSuccess, setFormSuccess] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string>('');

  const form = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={cn(className, styles.root)}>
      <h2 className={styles.title}>
        {formatMessage({ id: 'auth.password.forgot' })}
      </h2>
      {Boolean(formSuccess) ? (
        <Message className={styles.success} type={MESSAGE_TYPES.SUCCESS}>
          {formSuccess}
        </Message>
      ) : (
        <React.Fragment>
          <Form
            className={cn(styles.form)}
            onSubmit={form.handleSubmit((data) => {
              setPending(true);
              postPasswordReset(
                data.email,
                `${window.location.protocol}//${window.location.host}/${locale}/account/password-reset/{key}/`,
                location.pathname
              )
                .then((data) => {
                  setFormSuccess(
                    formatMessage(
                      { id: 'auth.password.forgot.success' },
                      { email: data.userEmail }
                    )
                  );
                })
                .catch((e) => {
                  setFormError(
                    formatMessage({
                      id:
                        e.code === 'spg_user_not_found'
                          ? 'auth.password.forgot.notFound'
                          : 'error.general',
                    })
                  );
                })
                .finally(() => setPending(false));
            })}
          >
            <FormElement
              name="email"
              label={formatMessage({ id: 'auth.email' })}
              Input={InputText}
              form={form}
              rules={{
                required: formatMessage(
                  { id: 'form.required' },
                  { field: formatMessage({ id: 'auth.email' }) }
                ),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: formatMessage({ id: 'auth.email.validate' }),
                },
              }}
              type="stacked"
            />
            {formError !== '' && (
              <FormFeedback type={MESSAGE_TYPES.ERROR}>
                {formError}
              </FormFeedback>
            )}
            <FormControls isLoading={pending} />
          </Form>
        </React.Fragment>
      )}
    </div>
  );
};

export default PasswordForm;
