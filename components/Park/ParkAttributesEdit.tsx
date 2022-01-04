import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Form, FormElement, InputCheckboxList, InputSelect } from '@theme';
import { useAppSettings } from '@common/appSettings/appSettingsContext';
import { ParkAnlageT, ParkFacilitiesT } from '@common/types/parks';
import cn from '@common/utils/classnames';
import { PARK_BUILDING } from '@common/utils/constants';
import { objectDiff, objectShallowEqual } from '@common/utils/helpers';
import styles from './ParkAttributesEdit.module.css';

let prevValues = null;

const ParkAttributesEdit = ({
  className = '',
  facilities: parkFacilities,
  anlage,
  setValues,
}: {
  className?: string;
  facilities: ParkFacilitiesT;
  anlage: ParkAnlageT;
  setValues: (anlage: ParkAnlageT, facilities: ParkFacilitiesT) => void;
}) => {
  const { facilities: settingsFacilities } = useAppSettings();
  const { formatMessage } = useIntl();
  const form = useForm<{ facilities: ParkFacilitiesT; anlage: ParkAnlageT }>({
    defaultValues: { facilities: parkFacilities, anlage },
  });

  const values = form.watch();

  React.useEffect(() => {
    if (!prevValues) {
      prevValues = values;
    }
    if (objectShallowEqual(prevValues, values)) {
      setValues(values.anlage, values.facilities);
      prevValues = values;
    }
  }, [values]);

  return (
    <Form className={cn(className, styles.root)}>
      <h2>{formatMessage({ id: 'park.edit.about' })}</h2>
      <FormElement
        label={formatMessage({ id: 'park.edit.anlage' })}
        name="anlage"
        Input={InputSelect}
        form={form}
        options={PARK_BUILDING.reduce(
          (acc, key) => ({
            ...acc,
            [key]: formatMessage({ id: `park.edit.anlage.${key}` }),
          }),
          {}
        )}
      />
      <FormElement
        label={formatMessage({ id: 'park.edit.facilities' })}
        name="facilities"
        Input={InputCheckboxList}
        form={form}
        options={settingsFacilities.reduce(
          (acc, key) => ({
            ...acc,
            [key]: formatMessage({ id: `park.edit.facilities.${key}` }),
          }),
          {}
        )}
      />
    </Form>
  );
};

export default ParkAttributesEdit;
