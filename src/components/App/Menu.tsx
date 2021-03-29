import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import './Menu.css';
import MenuToggler from '@comp/App/MenuToggler';
import { Button } from '@theme';
import { unleadingSlashIt, untrailingSlashIt } from '@common/utils/helpers';
import { useLocale } from '@common/intl/intlContext';

const Menu = ({ className = '' }: { className?: string }) => {
  const [buttonState, setButtonState] = React.useState<
    'open' | 'back' | 'closed'
  >('closed');

  const { locale } = useLocale();
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const path = untrailingSlashIt(unleadingSlashIt(location.pathname));
    const pathParams = path.split('/');
    if (pathParams.length === 1) {
      setButtonState('closed');
    } else if (pathParams.length >= 2) {
      setButtonState('back');
    }
  }, [location]);

  const onClick = () => {
    switch (buttonState) {
      case 'back':
        history.push(`/${locale}/`);
        break;
      case 'closed':
        setButtonState('open');
        break;
      case 'open':
        setButtonState('closed');
        break;
    }
  };

  return (
    <nav className={`${className} menu`} id="menu">
      <MenuToggler
        className="menu__toggler"
        onClick={onClick}
        buttonState={buttonState}
      />
      <div className="menu__elements" aria-hidden={buttonState !== 'open'}>
        <Button
          element="router"
          href="/about/"
          className="menu__links menu__links--about"
          icon="mdi/information"
          round
        />
        <Button
          element="router"
          href="/park/edit/new/"
          className="menu__links menu__links--add"
          icon="mdi/markerplus"
          round
        />
        <Button
          element="router"
          href="/account/"
          className="menu__links menu__links--account"
          icon="mdi/account"
          round
        />
      </div>
    </nav>
  );
};

export default Menu;
