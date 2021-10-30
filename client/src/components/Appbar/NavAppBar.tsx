import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
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
      <div className={classes.root}>
        <AppBar className={classes.appBarContainer} position="static" elevation={0}>
          <Toolbar>
            <Container className={classes.appBarItems}>
              <Typography className={classes.appBarTitle}>My school Board</Typography>
              <IconButton onClick={onClickMenu}>
                <Menu className={classes.menuButton} />
              </IconButton>
            </Container>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
