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
}) => {
  return (
    <nav className={cn(className, styles.root)}>
      {/*
      todo: active border bottom animation
      <span className={styles.line} style={{ left: 0, width: 100 }} />
      */}
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
};

export default Menu;
