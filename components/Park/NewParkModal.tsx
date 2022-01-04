import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import {
  Form,
  FormControls,
  FormElement,
  InputMap,
  InputText,
  PortalBox,
  SHADOW_BOX_SIZES,
} from '@theme';
import { putPark } from '@common/api/park';
import { AuthWrapper } from '@common/auth/authContext';
import { MapParkI } from '@common/types/parks';

const NewParkModal = ({
  className = '',
  show,
  setShow,
}: {
  className?: string;
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const { formatMessage } = useIntl();
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const router = useRouter();

  const form = useForm<{ title: string; location: MapParkI }>({
    defaultValues: {
      title: '',
      location: null,
    },
  });

  return (
    <PortalBox
      setShow={setShow}
      show={show}
      size={SHADOW_BOX_SIZES.SMALL}
      title={formatMessage({ id: 'park.new.modal.title' })}
    >
      <AuthWrapper>
        <Form
          className={className}
          onSubmit={form.handleSubmit((data) => {
            setPending(true);
            putPark(data.title, data.location)
              .then((resp) => {
                setShow(false);
                router.push(`/park/edit/${resp}`);
              })
              .catch((e) => setError(e))
              .finally(() => setPending(false));
          })}
        >
          <FormElement
            name="title"
            form={form}
            Input={InputText}
            label={formatMessage({ id: 'park.new.title' })}
            type="stacked"
            rules={{
              required: formatMessage(
                { id: 'form.required' },
                { field: formatMessage({ id: 'park.new.title' }) }
              ),
            }}
          />
          <FormElement
            name="location"
            form={form}
            Input={InputMap}
            label={formatMessage({ id: 'park.new.location' })}
            type="stacked"
            rules={{
              validate: (value) =>
                !value
                  ? formatMessage(
                      { id: 'form.required' },
                      { field: formatMessage({ id: 'park.new.location' }) }
                    )
                  : null,
            }}
          />
          <FormControls isLoading={pending} />
        </Form>
      </AuthWrapper>
    </PortalBox>
  );
};

export default NewParkModal;
