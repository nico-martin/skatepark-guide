import jwtDecode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import AuthForm from '@common/auth/components/AuthForm';
import { settingsDB } from '@common/idb';
import dayjs from '@common/utils/dayjs';

const AuthContext = React.createContext<{
  jwt: string;
  setJwt: (jwt: string) => void;
}>({
  jwt: null,
  setJwt: () => {},
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [jwt, setJwt] = React.useState<string>(null);
  const [init, setInit] = React.useState<boolean>(false);

  React.useEffect(() => {
    init && settingsDB.set('jwt', jwt);
  }, [jwt]);

  React.useEffect(() => {
    settingsDB.get('jwt').then((jwt) => {
      if (jwt) {
        const decoded = jwtDecode<JwtPayload>(jwt);
        if (dayjs(decoded.exp).isBefore(dayjs())) {
          setJwt(jwt);
        }
      }
      setInit(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): {
  isLoggedIn: boolean;
  jwt: string;
  setJwt: (jwt: string) => void;
} => {
  const { jwt, setJwt } = React.useContext(AuthContext);
  return {
    isLoggedIn: Boolean(jwt),
    jwt,
    setJwt,
  };
};

export const AuthWrapper = ({
  children,
  classNameForm = '',
}: {
  children: any;
  classNameForm?: string;
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <AuthForm className={classNameForm} />;
};
