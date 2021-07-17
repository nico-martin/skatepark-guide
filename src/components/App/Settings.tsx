import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@theme';
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
  const [open, setOpen] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();
  const { updateFilter, filter } = useMapFilter();
  return (
    <React.Fragment>
      <div className={cn(settingsClassName, styles.root)} aria-hidden={!open}>
        <h2>{formatMessage({ id: 'settings.filter' })}</h2>
        <div>
          {Object.entries(filter).map(([item, state]) => (
            <label>
              <input
                type="checkbox"
                checked={state}
                name={item}
                onClick={(e) => {
                  updateFilter({
                    [item]: (e.target as HTMLInputElement).checked,
                  });
                }}
              />{' '}
              {item}
            </label>
          ))}
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
