import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@theme';
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
  return (
    <React.Fragment>
      <div className={cn(settingsClassName, styles.root)} aria-hidden={!open}>
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
