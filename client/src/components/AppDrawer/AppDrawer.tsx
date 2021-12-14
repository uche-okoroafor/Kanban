import { DrawerProps } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';
import { useBoard } from '../../context/useBoardContext';
import { Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
/**
 * AppDrawer props type defintion.
 * @interface
 */
interface AppDrawerProps extends DrawerProps {
  setOpenDrawer: React.Dispatch<boolean>;
  openDrawer: boolean;
}

/**
 * Custom AppDrawer prop type definition.
 * @component
 * @param AppDrawerProps
 * @returns {JSX.Element}
 */

export default function AppDrawer({ setOpenDrawer, openDrawer }: AppDrawerProps): JSX.Element {
  const { boards, handleSelectedBoard } = useBoard();

  const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(state);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box style={{ padding: '10px', background: '#759CFC', color: 'white' }}>
        <Typography align="center" variant="h6">
          {' '}
          Boards
        </Typography>
      </Box>
      <List>
        {boards?.map((board) => (
          <ListItem button key={board._id} onClick={() => handleSelectedBoard(board)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={board.boardTitle} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
