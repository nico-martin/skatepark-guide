import React from 'react';
import { Button } from '@theme';
import { useIntl } from 'react-intl';

import './Settings.css';

const Settings = ({
  className = '',
  settingsClassName = '',
}: {
  className: string;
  settingsClassName: string;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();
  return (
    <React.Fragment>
      <div className={`${settingsClassName} settings`} aria-hidden={!open}>
        <h2>{formatMessage({ id: 'settings.title' })}</h2>
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
