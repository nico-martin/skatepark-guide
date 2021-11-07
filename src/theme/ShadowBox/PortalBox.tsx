import React from 'react';
import ReactDOM from 'react-dom';
import { ShadowBox } from '../index';
import { SHADOW_BOX_SIZES } from './ShadowBox';

const Portal = ({ children }: { children?: React.JSX.Element }) =>
  ReactDOM.createPortal(children, document.querySelector('#shadowbox'));

export default ({
  children,
  close,
  size,
  ...props
}: {
  children?: React.JSX.Element | React.JSX.Element[] | string;
  close: Function;
  size?: SHADOW_BOX_SIZES;
  [key: string]: any;
}) => (
  <Portal>
    <ShadowBox children={children} close={close} size={size} {...props} />
  </Portal>
);
