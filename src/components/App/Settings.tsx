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
import { useMapFilter, useUserPosition } from '@common/hooks/mapParksContext';
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
  const { watchPosition, clearPosition, userPosition } = useUserPosition();

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
        {'geolocation' in window.navigator && (
          <div className={cn(styles.location)}>
            <h2>{formatMessage({ id: 'settings.location' })}</h2>
            <Button
              className={cn(styles.locationButton, {
                [styles.locationButtonActive]: Boolean(userPosition),
              })}
              classNameIcon={styles.locationButtonIcon}
              icon="mdi/location-full"
              onClick={() => {
                if (userPosition) {
                  clearPosition();
                } else {
                  watchPosition();
                  setOpen(false);
                }
              }}
              color="white"
              round
            >
              {formatMessage({
                id: userPosition
                  ? 'settings.location.active'
                  : 'settings.location.action',
              })}
            </Button>
          </div>
        )}
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
          {window.installEvent !== null && (
            <div className={styles.appSettings}>
              <Button
                className={styles.appSettingsButton}
                onClick={() => window.installEvent.prompt()}
                icon="mdi/a2h"
                color="white"
                type="text"
              >
                {formatMessage({ id: 'settings.app.install' })}
              </Button>
            </div>
          )}
          {'share' in window.navigator && (
            <div className={styles.appSettings}>
              <Button
                icon="mdi/share"
                className={styles.appSettingsButton}
                onClick={() =>
                  window.navigator
                    .share({
                      title: formatMessage({ id: 'settings.app.share' }),
                      text: formatMessage({ id: 'settings.app.share.text' }),
                      url: window.location.href,
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error))
                }
                color="white"
                type="text"
              >
                {formatMessage({ id: 'settings.app.share' })}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button
        className={className}
        onClick={() => setOpen(!open)}
        icon={open ? 'mdi/close' : 'mdi/settings'}
        round
      />
    </React.Fragment>
  );
};

export default Settings;
