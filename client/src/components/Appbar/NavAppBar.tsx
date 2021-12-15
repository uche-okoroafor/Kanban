import { AppBar, Box, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import useStyles from './useStyles';
import { useBoard } from '../../context/useBoardContext';
/**
 * Navigation app bar props
 * type defintion.
 * @interface
 */
interface NavAppBarProps {
  onClickMenu?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Navigation Appbar custom component.
 * @component
 * @param NavAppBarProps
 * @returns {JSX.Element}
 */
export default function NavAppBar({ onClickMenu }: NavAppBarProps): JSX.Element {
  const classes = useStyles();
  const { board } = useBoard();
  return (
    <>
      <Box className={classes.root}>
        <AppBar className={classes.appBarContainer} position="static" elevation={0}>
          <Toolbar className={classes.appBarItems}>
            <Box>
              <Typography className={classes.appBarTitle}>{board.boardTitle}</Typography>
            </Box>
            <Box>
              <Button className={classes.menuButton} onClick={onClickMenu} startIcon={<Menu />}>
                {' '}
                View Boards
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
