import React, { useState, useEffect, Fragment } from 'react';
import { Button } from '@app/theme';
import { useIntl } from 'react-intl';

import './Settings.css';

const Settings = ({
  className = '',
  settingsClassName = '',
}: {
  className: string;
  settingsClassName: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { formatMessage } = useIntl();
  return (
    <Fragment>
      <div className={`${settingsClassName} settings`} aria-hidden={!open}>
        <h2>{formatMessage({ id: 'settings.title' })}</h2>
      </div>
      <Button
        className={className}
        onClick={() => setOpen(!open)}
        icon="mdi/settings"
        round
      />
    </Fragment>
  );
};

export default Settings;
