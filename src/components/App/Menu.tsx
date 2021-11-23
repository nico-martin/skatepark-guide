import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, PortalBox } from '@theme';
import { useLocale } from '@common/intl/intlContext';
import cn from '@common/utils/classnames';
import { unleadingSlashIt, untrailingSlashIt } from '@common/utils/helpers';
import MenuToggler from '@comp/App/MenuToggler';
import NewParkModal from '@comp/Park/NewParkModal';
import styles from './Menu.css';

const Menu = ({ className = '' }: { className?: string }) => {
  const [newParkModal, setNewParkModal] = React.useState<boolean>(false);
  const [buttonState, setButtonState] = React.useState<
    'open' | 'back' | 'closed'
  >('closed');

  const { activeLocale } = useLocale();
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
        history.push(`/${activeLocale}/`);
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
    <nav className={cn(className, styles.root)} id="menu">
      <MenuToggler
        className={styles.toggler}
        onClick={onClick}
        buttonState={buttonState}
      />
      <NewParkModal show={newParkModal} setShow={setNewParkModal} />
      <div className={styles.elements} aria-hidden={buttonState !== 'open'}>
        <Button
          element="router"
          href="/about/"
          className={cn(styles.links, styles.linksAbout)}
          icon="mdi/information"
          round
        />
        <Button
          onClick={() => setNewParkModal(true)}
          className={cn(styles.links, styles.linksAdd)}
          icon="mdi/markerplus"
          round
        />
        <Button
          element="router"
          href="/account/"
          className={cn(styles.links, styles.linksAccount)}
          icon="mdi/account"
          round
        />
      </div>
    </nav>
  );
};

export default Menu;
