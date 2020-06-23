import React, { useState } from 'react';

import './Menu.css';
import MenuToggler from '@comp/App/MenuToggler';
import IntlLink from '@app/intl/IntlLink';
import { Icon, Button } from '@app/theme';

const Menu = ({ className = '' }: { className?: string }) => {
  const [buttonState, setButtonState] = useState<'open' | 'back' | 'closed'>(
    'closed'
  );

  const onClick = () => {
    switch (buttonState) {
      case 'back':
        setButtonState('closed');
        break;
      case 'closed':
        setButtonState('open');
        break;
      case 'open':
        setButtonState('back');
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
          isLink
          href="/about/"
          className="menu__links menu__links--about"
          icon="mdi/information"
        />
        <Button
          isLink
          href="/park/edit/new/"
          className="menu__links menu__links--add"
          icon="mdi/markerplus"
        />
        <Button
          isLink
          href="/account/"
          className="menu__links menu__links--account"
          icon="mdi/account"
        />
      </div>
    </nav>
  );
};

export default Menu;
