import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
  onHandleOpen: () => void;
}

const AvatarDisplay = ({ user, onHandleOpen }: Props): JSX.Element => {
  return (
    <Avatar
      onClick={onHandleOpen}
      alt="Profile Image"
      src={user.profileUrl || `https://robohash.org/${user.email}.png`}
    />
  );
};

export default AvatarDisplay;
