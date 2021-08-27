import React from 'react';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import styles from './Menu.css';

const Menu = ({
  className = '',
  menu,
}: {
  className?: string;
  menu: Record<
    string,
    {
      title: string;
      active: boolean;
    }
  >;
}) => (
  <nav className={cn(className, styles.navigation)}>
    {Object.entries(menu).map(([menuSlug, menuItem]) => (
      <IntlLink
        href={menuSlug}
        className={cn(styles.navigationElement, {
          [styles.navigationElementActive]: menuItem.active,
        })}
      >
        {menuItem.title}
      </IntlLink>
    ))}
  </nav>
);

export default Menu;
