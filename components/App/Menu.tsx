import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@theme';
import MenuToggler from '@components/App/MenuToggler';
import NewParkModal from '@components/Park/NewParkModal';
import cn from '@common/utils/classnames';
import { unleadingSlashIt, untrailingSlashIt } from '@common/utils/helpers';
import styles from './Menu.module.css';

const Menu = ({ className = '' }: { className?: string }) => {
  const [newParkModal, setNewParkModal] = React.useState<boolean>(false);
  const [buttonState, setButtonState] = React.useState<
    'open' | 'back' | 'closed'
  >('closed');
  const router = useRouter();

  React.useEffect(() => {
    const path = untrailingSlashIt(unleadingSlashIt(router.pathname));
    const pathParams = path.split('/').filter(Boolean);
    if (pathParams.length === 0) {
      setButtonState('closed');
    } else if (pathParams.length >= 1) {
      setButtonState('back');
    }
  }, [router.pathname]);

  const onClick = () => {
    switch (buttonState) {
      case 'back':
        router.push('/');
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
          icon="information"
          round
        />
        <Button
          onClick={() => setNewParkModal(true)}
          className={cn(styles.links, styles.linksAdd)}
          icon="markerplus"
          round
        />
        <Button
          element="router"
          href="/account/"
          className={cn(styles.links, styles.linksAccount)}
          icon="account"
          round
        />
      </div>
    </nav>
  );
};

export default Menu;
