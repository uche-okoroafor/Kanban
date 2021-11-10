import { ListItem, ListItemIcon, Menu, MenuItem, MenuProps, Typography } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import React from 'react';

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
  return (
    <>
      <Menu {...rest}>
        <MenuItem onClick={onClickProfile}>
          <ListItem>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Profile</Typography>
          </ListItem>
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
