import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import NavAppBar from '../Appbar/NavAppBar';
import AppDrawer from '../AppDrawer/AppDrawer';
import Navbar from '../Navbar/Navbar';

/**
 * Applayout props type defintion.
 * @interface
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Component to persist the app layout through
 * out different pages.
 * @component
 * @param AppLayoutPops
 * @returns {JSX.Element}
 */
export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar />
      <NavAppBar onClickMenu={() => setOpen(true)} />
      <AppDrawer open={open} onClick={() => setOpen(false)}>
        <Typography variant="h6">Drawer</Typography>
      </AppDrawer>
      <div>{children}</div>
    </div>
  );
}
