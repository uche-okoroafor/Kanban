import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../context/useAuthContext';
import { stringAvatar } from '../../pages/Profile/useStyles';
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
  const { loggedInUser } = useAuth();
  const [userImage, setImage] = useState('');

  useEffect(() => {
    if (loggedInUser?.imageUrl !== undefined) setImage(loggedInUser?.imageUrl);
  }, [loggedInUser]);

  return (
    <IconButton onClick={onClick}>
      <Avatar
        {...stringAvatar(loggedInUser?.username ? loggedInUser?.username.toUpperCase() : 'B', 50, 50)}
        src={userImage}
      />
    </IconButton>
  );
}
