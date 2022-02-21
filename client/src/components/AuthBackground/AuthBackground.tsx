import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NavAppBar from '../Appbar/NavAppBar';
import AppDrawer from '../AppDrawer/AppDrawer';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useStyles from './useStyles';
/**
 * AuthBackground props type defintion.
 * @interface
 */

/**
 * Component to persist the app layout through
 * out different pages.
 * @component
 * @returns {JSX.Element}
 */
export default function AuthBackground(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item sm={5} md={6} className={classes.backgroundImg}>
      {' '}
      <Box p={4}>
        <Logo />
      </Box>
    </Grid>
  );
}
