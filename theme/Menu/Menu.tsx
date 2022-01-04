import React from 'react';
import Link from 'next/link';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import styles from './Menu.module.css';

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
        <Link key={menuSlug} href={menuSlug}>
          <a
            className={cn(styles.navigationElement, {
              [styles.navigationElementActive]: menuItem.active,
            })}
          >
            {menuItem.title}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
