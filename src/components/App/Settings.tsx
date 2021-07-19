import React from 'react';
import { useIntl } from 'react-intl';
import {
  Button,
  Form,
  FormElement,
  Icon,
  InputCheckbox,
  InputSelect,
} from '@theme';
import { useMapFilter } from '@common/hooks/mapParksContext';
import { useLocale } from '@common/intl/intlContext';
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
  const { activeLocale, localeKeys, changeLocale, changeLocalePending } =
    useLocale();
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
                    [item]: Boolean(newState),
                  })
                }
                type="inline"
                reverse
                Input={InputCheckbox}
              />
            ))}
          </Form>
        </div>
        {/* todo: add location button
        <div className={cn(styles.location)}>
          <h2>{formatMessage({ id: 'settings.location' })}</h2>
        </div>*/}
        <div className={cn(styles.app)}>
          <h2 className={styles.appHeading}>
            {formatMessage({ id: 'settings.app' })}
          </h2>
          <div className={styles.appSettings}>
            <FormElement
              name="app-language"
              label={formatMessage({ id: 'language' }) + ':'}
              value={activeLocale}
              onChange={(newLocale) => changeLocale(String(newLocale))}
              Input={InputSelect}
              options={localeKeys.reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: formatMessage({ id: `language.${key}` }),
                }),
                {}
              )}
              disabled={changeLocalePending}
            />
          </div>
          <div className={styles.appSettings}>
            <button className={styles.appSettingsButton}>
              <Icon icon="mdi/a2h" className={styles.appSettingsButtonIcon} />
              {formatMessage({ id: 'settings.app.install' })}
            </button>
          </div>
          <div className={styles.appSettings}>
            <button className={styles.appSettingsButton}>
              <Icon icon="mdi/share" className={styles.appSettingsButtonIcon} />
              {formatMessage({ id: 'settings.app.share' })}
            </button>
          </div>
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
