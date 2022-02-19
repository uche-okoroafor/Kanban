import { Box, Grid } from '@material-ui/core';
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

export default function Navbar(): JSX.Element {
  const { logout } = useAuth();
  const classses = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classses.root}>
      <Grid container spacing={2}>
        <Grid item md={3} className={classses.container}>
          <img src={KanbanLogo} alt="kanban-logo" />
        </Grid>
        <Grid item md={9} className={classses.avatarContainer}>
          <NavButton title="Dashboard" to="/" icon={<DashboardOutlined />} />
          <NavButton title="calendar" to="/calendar" icon={<CalendarTodayOutlined />} />
          <CreateBoardButton />
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
        </Grid>
      </Grid>
    </Box>
  );
}
