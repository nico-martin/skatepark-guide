import React from 'react';
import { getAppSettings } from '@common/api/appSettings';
import { useToast } from '@common/toast/toastContext';
import { ApiImageI } from '@common/types/image';
import { FacilitiesT } from '@common/types/parks';
import pkg from '../../package.json';

interface AppSettingsI {
  defaultLogo: ApiImageI;
  facilities: FacilitiesT;
  appVersion: string;
}

const Context = React.createContext<AppSettingsI>(null);

export const AppSettingsProvider = ({ children }: { children: any }) => {
  const [settings, setSettings] = React.useState<AppSettingsI>({
    defaultLogo: null,
    facilities: [],
    appVersion: '',
  });
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [appVersion, setAppVersion] = React.useState<string>(pkg.version);

  const { addToast } = useToast();

  React.useEffect(() => {
    setSettings(settings);
    getAppSettings<AppSettingsI>()
      .then((newSettings) => setSettings({ ...settings, ...newSettings }))
      .catch((e) =>
        addToast({
          message: `Setup failed: ${e}`,
        })
      )
      .finally(() => setInitialized(true));
  }, []);

  return (
    <Context.Provider value={{ ...settings, appVersion }}>
      {children}
    </Context.Provider>
  );
};

export const useAppSettings = (): AppSettingsI => React.useContext(Context);
