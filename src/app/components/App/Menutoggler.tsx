import React from 'react';
import { Button } from '@app/theme';
import './MenuToggler.css';

const MenuToggler = ({
  onClick,
  buttonState,
  className = '',
}: {
  onClick: Function;
  buttonState: string;
  className?: string;
}) => (
  <Button
    className={`${className} menutoggler button button--icon`}
    onClick={() => onClick()}
    data-state={buttonState}
  >
    {[1, 2, 3].map(i => (
      <span className={`menutoggler__line menutoggler__line--${i}`} />
    ))}
  </Button>
);

export default MenuToggler;
