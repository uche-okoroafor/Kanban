import { Button, ListItem, ListItemIcon, Menu, MenuItem, MenuProps, Typography } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavButton from '../Button/NavButton';
import CreateBoardButton from '../Button/CreateBoardButton';
import { CalendarTodayOutlined, DashboardOutlined } from '@material-ui/icons';
import { useMediaQuery, useTheme } from '@mui/material';
/**
 * AvatarMenu component props
 * type definition.
 * @interface
 */
interface AvatarMenuProps extends MenuProps {
  onClickProfile?: React.MouseEventHandler<HTMLLIElement>;
  onClickLogOut?: React.MouseEventHandler<HTMLLIElement>;
}

/**
 * Displays menu options for the avatar component.
 * @component
 * @param AvatarMenuProps
 * @returns {JSX.Element}
 */
export default function AvatarMenu({ onClickProfile, onClickLogOut, ...rest }: AvatarMenuProps): JSX.Element {
  const history = useHistory();
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up(800));
  return (
    <>
      <Menu {...rest}>
        <MenuItem onClick={onClickProfile}>
          <ListItem>
            <Button startIcon={<PersonOutlineOutlinedIcon color="primary" />}>
              {' '}
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                Profile
              </Typography>
            </Button>
          </ListItem>
        </MenuItem>{' '}
        {!isDesktopView && (
          <MenuItem>
            <NavButton title="Dashboard" to="/dashboard" icon={<DashboardOutlined />} />
          </MenuItem>
        )}
        {!isDesktopView && (
          <MenuItem>
            <NavButton title="calendar" to="/calendar" icon={<CalendarTodayOutlined />} />
          </MenuItem>
        )}
        {!isDesktopView && (
          <MenuItem>
            <CreateBoardButton />
          </MenuItem>
        )}
        <MenuItem onClick={onClickLogOut}>
          <ListItem>
            <Button startIcon={<ExitToAppOutlinedIcon color="primary" />}>
              {' '}
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                Logout
              </Typography>
            </Button>
          </ListItem>
        </MenuItem>
      </Menu>
    </>
  );
}
