import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import NavAppBar from '../Appbar/NavAppBar';
import AppDrawer from '../AppDrawer/AppDrawer';
import DropZone from '../DropZone/DropZone';
import Navbar from '../Navbar/Navbar';
import RenderFile from '../RenderFile/RenderFile';

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
  const [file, setFile] = useState<{ [prop: string]: string | number } | null>(null);
  const [openDropzone, setOpenDropzone] = useState(false);
  const handleOpenDropzone = () => setOpenDropzone(true);
  const handleCloseDropzone = () => {
    setOpenDropzone(false);
    setFile(null);
  };
  return (
    <Box>
      <Navbar onHandleOpen={handleOpenDropzone} />
      <NavAppBar onClickMenu={() => setOpen(true)} />
      <DropZone open={openDropzone && !file} onHandleClose={handleCloseDropzone} onSetFile={setFile} />
      <RenderFile
        onHandleClose={handleCloseDropzone}
        file={file}
        open={file ? true : false}
        onSetFile={setFile}
        setOpen={setOpenDropzone}
      />
      <AppDrawer open={open} onClick={() => setOpen(false)}>
        <Typography variant="h6">Drawer</Typography>
      </AppDrawer>
      <Box>{children}</Box>
    </Box>
  );
}
