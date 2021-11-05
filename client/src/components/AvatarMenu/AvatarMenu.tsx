import { ListItem, ListItemIcon, Menu, MenuItem, MenuProps, Typography } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AvatarMenu component props
 * type definition.
 * @interface
 */
interface AvatarMenuProps extends MenuProps {
  onClickLogOut?: React.MouseEventHandler<HTMLLIElement>;
}

/**
 * Displays menu options for the avatar component.
 * @component
 * @param AvatarMenuProps
 * @returns {JSX.Element}
 */
export default function AvatarMenu({ onClickLogOut, ...rest }: AvatarMenuProps): JSX.Element {
  return (
    <>
      <Menu {...rest}>
        <MenuItem>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <ListItem>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body1" style={{ color: 'black' }}>
                Profile
              </Typography>
            </ListItem>
          </Link>
        </MenuItem>
        <MenuItem onClick={onClickLogOut}>
          <ListItem>
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Logout</Typography>
          </ListItem>
        </MenuItem>
      </Menu>
    </>
  );
}
