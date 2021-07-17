import React from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, FormElement, InputCheckbox } from '@theme';
import { useMapFilter } from '@common/hooks/mapParksContext';
import cn from '@common/utils/classnames';
import styles from './Settings.css';

const Settings = ({
  className = '',
  settingsClassName = '',
}: {
  className: string;
  settingsClassName: string;
}) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const { formatMessage } = useIntl();
  const { updateFilter, filter } = useMapFilter();
  return (
    <React.Fragment>
      <div className={cn(settingsClassName, styles.root)} aria-hidden={!open}>
        <div className={cn(styles.filter)}>
          <h2>{formatMessage({ id: 'settings.filter' })}</h2>
          <Form className={cn(styles.filterForm)}>
            {Object.entries(filter).map(([item, state]) => (
              <FormElement
                name={item}
                label={formatMessage({ id: `park.facility.${item}` })}
                value={state}
                onChange={(newState) =>
                  updateFilter({
                    [item]: newState,
                  })
                }
                type="inline"
                reverse
                Input={InputCheckbox}
              />
            ))}
          </Form>
        </div>
        <div className={cn(styles.location)}>
          <h2>{formatMessage({ id: 'settings.location' })}</h2>
        </div>
        <div className={cn(styles.app)}>
          <h2>{formatMessage({ id: 'settings.app' })}</h2>
        </div>
      </div>
      <Button
        className={className}
        onClick={() => setOpen(!open)}
        icon="mdi/settings"
        round
      />
    </React.Fragment>
  );
};

export default Settings;
