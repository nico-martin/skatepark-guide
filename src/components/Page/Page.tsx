import React from 'react';
import { Button } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Page.css';

const Page = ({ className = '' }: { className?: string }) => (
  <div className={cn(styles.root, className)}>
    <Button>Hallo Welt</Button>
    <Button round>Hallo Welt</Button>
    <Button icon="mdi/heart" />
    <Button icon="mdi/heart" round />
    <Button icon="mdi/heart">Hallo Welt</Button>
    <Button round icon="mdi/heart">
      Hallo Welt
    </Button>
  </div>
);

export default Page;
