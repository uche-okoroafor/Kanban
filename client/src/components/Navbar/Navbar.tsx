import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';
import KanbanLogo from '../../Images/logo.png';
import { DashboardOutlined, CalendarTodayOutlined } from '@material-ui/icons';
import NavButton from '../Button/NavButton';
import CreateBoardButton from '../Button/CreateBoardButton';
import AvatarButton from '../AvatarButton/AvatarButton';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import Logo from '../Logo/Logo';

export default function Navbar(): JSX.Element {
  const { logout } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up(800));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Logo />
      </Box>
      <Box className={classes.avatarContainer}>
        {isDesktopView ? (
          <>
            <NavButton title="Dashboard" to="/dashboard" icon={<DashboardOutlined />} />
            <NavButton title="calendar" to="/calendar" icon={<CalendarTodayOutlined />} />
            <CreateBoardButton />
          </>
        ) : null}
        <AvatarButton onClick={handleClick} />
        <AvatarMenu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClickProfile={() => {
            // handles profile option in the menu
            history.push('/profile');
            handleClose();
          }}
          onClickLogOut={logout}
        />
      </Box>
    </Box>
    // </Box>
  );
}
