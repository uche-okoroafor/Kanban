import { Menu, MenuItem, MenuProps } from '@material-ui/core';
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
        <MenuItem onClick={onClickProfile}>Profile</MenuItem>
        <MenuItem onClick={onClickLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
}
