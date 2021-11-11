import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import useStyles from './useStyles';

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
  return (
    <>
      <Box className={classes.root}>
        <AppBar className={classes.appBarContainer} position="static" elevation={0}>
          <Toolbar className={classes.appBarItems}>
            <Box>
              <Typography className={classes.appBarTitle}>My school Board</Typography>
            </Box>
            <Box>
              <IconButton onClick={onClickMenu}>
                <Menu className={classes.menuButton} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
