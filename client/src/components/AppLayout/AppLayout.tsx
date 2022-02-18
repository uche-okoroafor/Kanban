import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NavAppBar from '../Appbar/NavAppBar';
import AppDrawer from '../AppDrawer/AppDrawer';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const [displayNavAppBar, setDisplayNavAppBar] = useState(true);
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/profile') {
      setDisplayNavAppBar(false);
    } else {
      setDisplayNavAppBar(true);
    }
  }, [location.pathname]);

  return (
    <Box>
      <Navbar />
      {displayNavAppBar && <NavAppBar onClickMenu={() => setOpenDrawer(true)} />}{' '}
      <AppDrawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      <Box>{children}</Box>
    </Box>
  );
}
