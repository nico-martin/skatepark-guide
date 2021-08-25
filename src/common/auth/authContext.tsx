import jwtDecode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import AuthForm from '@common/auth/components/AuthForm';
import { settingsDB } from '@common/idb';
import dayjs from '@common/utils/dayjs';

interface AuthFeedbackI {
  type: string;
  message: string;
}

const AuthContext = React.createContext<{
  jwt: string;
  setJwt: (jwt: string) => void;
  email: string;
  setEmail: (email: string) => void;
}>({
  jwt: null,
  setJwt: () => {},
  email: '',
  setEmail: () => {},
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [jwt, setJwt] = React.useState<string>(null);
  const [init, setInit] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');

  React.useEffect(() => {
    window.jwt = jwt || '';
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
    <AuthContext.Provider value={{ jwt, setJwt, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): {
  isLoggedIn: boolean;
  jwt: string;
  setJwt: (jwt: string) => void;
  email: string;
  setEmail: (email: string) => void;
} => {
  const { jwt, setJwt, email, setEmail } = React.useContext(AuthContext);
  return {
    isLoggedIn: Boolean(jwt),
    jwt,
    setJwt,
    email,
    setEmail,
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
