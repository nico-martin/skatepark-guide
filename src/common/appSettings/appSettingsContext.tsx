import React from 'react';
import { getAppSettings } from '@common/api/appSettings';
import { useToast } from '@common/toast/toastContext';
import { ApiImageI } from '@common/types/image';

interface AppSettingsI {
  defaultLogo: ApiImageI;
}

const Context = React.createContext<AppSettingsI>(null);

export const AppSettingsProvider = ({ children }: { children: any }) => {
  const [settings, setSettings] = React.useState<AppSettingsI>(null);
  const [initialized, setInitialized] = React.useState<boolean>(false);

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
    <Context.Provider value={settings}>
      {initialized ? children : null}
    </Context.Provider>
  );
};

export const useAppSettings = (): AppSettingsI => React.useContext(Context);
