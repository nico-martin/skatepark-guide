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
  const [settings, setSettings] = React.useState<AppSettingsI>(null);
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [appVersion, setAppVersion] = React.useState<string>(pkg.version);

  const { addToast } = useToast();

  React.useEffect(() => {
    getAppSettings<AppSettingsI>()
      .then((settings) => setSettings(settings))
      .catch((e) =>
        addToast({
          message: `Setup failed: ${e}`,
        })
      )
      .finally(() => setInitialized(true));
  }, []);

  return (
    <Context.Provider value={{ ...settings, appVersion }}>
      {initialized ? children : null}
    </Context.Provider>
  );
};

export const useAppSettings = (): AppSettingsI => React.useContext(Context);
