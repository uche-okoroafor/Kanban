import React from 'react';
import { Modal, ModalProps } from '@material-ui/core';

interface AppDropModalProps extends ModalProps {
  children: React.ReactElement;
}

export default function AppDropModal({ children, ...rest }: AppDropModalProps): JSX.Element {
  return <Modal {...rest}>{children}</Modal>;
}
