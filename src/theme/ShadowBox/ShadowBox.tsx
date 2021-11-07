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
  close,
  size = SHADOW_BOX_SIZES.LARGE,
  className = '',
  preventClose,
}: {
  title?: string;
  children?: React.JSX.Element | React.JSX.Element[] | string;
  close: Function;
  size?: SHADOW_BOX_SIZES;
  className?: string;
  preventClose?: boolean;
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const onClose = () => {
    if (preventClose) {
      return;
    }
    setShow(false);
    window.setTimeout(() => {
      close();
    }, 200);
  };

  return (
    <div
      className={cn(className, styles.root, {
        [styles.isSmall]: size === SHADOW_BOX_SIZES.SMALL,
      })}
      data-visible={show}
    >
      <div className={styles.shadow} onClick={onClose} />
      <article className={styles.box}>
        <header className={cn(styles.header)}>
          {title !== null && <h1 className={styles.title}>{title}</h1>}{' '}
          {!preventClose && (
            <CloseButton className={styles.close} onClick={onClose} />
          )}
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
};
