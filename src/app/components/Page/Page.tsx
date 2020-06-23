import React from 'react';
import { Button } from '@app/theme';

const Page = () => (
  <React.Fragment>
    <Button>Hallo Welt</Button>
    <Button round>Hallo Welt</Button>
    <Button icon="mdi/heart" />
    <Button icon="mdi/heart" round />
    <Button icon="mdi/heart">Hallo Welt</Button>
    <Button round icon="mdi/heart">
      Hallo Welt
    </Button>
  </React.Fragment>
);

export default Page;
