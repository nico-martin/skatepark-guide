import React from 'react';
import ReactDOM from 'react-dom';
import { ShadowBox } from '../index';
import { SHADOW_BOX_SIZES } from './ShadowBox';

const Portal = ({ children }: { children?: JSX.Element }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(children, document.querySelector('#shadowbox'))
    : null;
};

const PortalBox = ({
  children,
  show,
  setShow,
  size,
  ...props
}: {
  children?: JSX.Element | JSX.Element[] | string;
  show: boolean;
  setShow: (show: boolean) => void;
  size?: SHADOW_BOX_SIZES;
  [key: string]: any;
}) => (
  <Portal>
    <ShadowBox show={show} setShow={setShow} size={size} {...props}>
      {children}
    </ShadowBox>
  </Portal>
);

export default PortalBox;
