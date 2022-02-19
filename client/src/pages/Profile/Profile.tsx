import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import Board from '../../components/Kanban/Board';
import { useAuth } from '../../context/useAuthContext';

export default function Profile(): JSX.Element {
  const { loggedInUser } = useAuth();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '70vh' }} m={2}>
      <Paper
        style={{
          width: '37%',
          height: '350px',
          flexDirection: 'column',
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Avatar src="/broken-image.jpg" alt={loggedInUser?.username} />
        <Typography>{loggedInUser?.username}</Typography>
      </Paper>
    </Box>
  );
}
