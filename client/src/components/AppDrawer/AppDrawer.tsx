import { Drawer, DrawerProps } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';

/**
 * AppDrawer props type defintion.
 * @interface
 */
interface AppDrawerProps extends DrawerProps {
  children?: React.ReactNode;
}

/**
 * Custom AppDrawer prop type definition.
 * @component
 * @param AppDrawerProps
 * @returns {JSX.Element}
 */
export default function AppDrawer({ children, ...rest }: AppDrawerProps): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <Drawer
        BackdropProps={{ invisible: true }}
        className={classes.drawer}
        anchor="right"
        classes={{ paper: classes.paper }}
        {...rest}
      >
        {children}
      </Drawer>
    </>
  );
}
