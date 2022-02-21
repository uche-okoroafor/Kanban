import { DrawerProps } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './useStyles';
import { useBoard } from '../../context/useBoardContext';
import { Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { IBoard } from '../../interface/Board';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [boardId, setBoardId] = useState<string | undefined>(undefined);
  const [boardTitle, setBoardTitle] = useState<string>('');

  const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(state);
  };

  const handleDeleteBoard = (board: IBoard) => {
    setBoardTitle(board.boardTitle);
    setBoardId(board?._id);
    setOpenDialog(true);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box style={{ padding: '1px', background: '#1A545C', color: 'white', textAlign: 'center' }}>
        <h4>Boards</h4>
      </Box>

      <List>
        {boards?.map((board) => (
          <ListItem button key={board._id} style={{ position: 'relative' }}>
            <ListItemIcon onClick={() => handleSelectedBoard(board)}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText onClick={() => handleSelectedBoard(board)} primary={board.boardTitle} />

            <IconButton
              onClick={() => handleDeleteBoard(board)}
              style={{
                position: 'absolute',
                width: '0.8rem',
                height: '0.5rem',
                right: '4%',
                top: '25%',
                // color: '#E83A30',
              }}
            >
              {' '}
              <DeleteIcon style={{ color: '#E83A30' }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {list()}{' '}
      </Drawer>{' '}
      <DeleteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        item={'board'}
        title={boardTitle}
        ItemsIds={{ boardId, cardId: undefined, columnId: undefined }}
      />
    </>
  );
}
