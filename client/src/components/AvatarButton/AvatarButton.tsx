import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';

/**
 * AvatarButton props type definition
 * @interface
 */
interface AvatarButtonProps {
  image?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * AvatarButton custom component for displaying
 * user profile.
 * @component
 * @param AvatarButtonProps
 * @returns {JSX.Element}
 */
export default function AvatarButton({ image, onClick }: AvatarButtonProps): JSX.Element {
  return (
    <IconButton onClick={onClick}>
      <Avatar src={image} />
    </IconButton>
  );
}
