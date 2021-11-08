import React from 'react';
import cn from '@common/utils/classnames';
import { CloseButton } from '../index';
import styles from './ShadowBox.css';

export enum SHADOW_BOX_SIZES {
  SMALL = 'small',
  LARGE = 'large',
}

export default ({
  title,
  children,
  size = SHADOW_BOX_SIZES.LARGE,
  className = '',
  show,
  setShow,
  preventClose = false,
}: {
  title?: string;
  children?: React.JSX.Element | React.JSX.Element[] | string;
  size?: SHADOW_BOX_SIZES;
  className?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  preventClose?: boolean;
}) => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (show) {
      setMounted(true);
      window.setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      window.setTimeout(() => setMounted(false), 150);
    }
  }, [show]);

  const close = () => (preventClose ? {} : setShow(false));

  return mounted ? (
    <div
      className={cn(className, styles.root, {
        [styles.isSmall]: size === SHADOW_BOX_SIZES.SMALL,
      })}
      data-visible={visible}
    >
      <div
        className={cn(styles.shadow, {
          [styles.shadowNoPointer]: preventClose,
        })}
        onClick={close}
      />
      <article className={styles.box}>
        <header className={cn(styles.header)}>
          {title !== null && <h1 className={styles.title}>{title}</h1>}{' '}
          {!preventClose && (
            <CloseButton className={styles.close} onClick={close} />
          )}
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    </div>
  ) : null;
};
