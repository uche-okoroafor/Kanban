import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Board from '../../components/Board/Board';
import { BoardProvider } from '../../context/useBoardContext';

/*
// removed for develop-ankit branch, integrate later
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
*/

export default function Dashboard(): JSX.Element {
  // removed for develop-ankit branch, integrate later
  // const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <BoardProvider>
      <Board />;
    </BoardProvider>
  );

  /*  
  // removed for develop-ankit branch, integrate later
  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>
    </Grid>
  );
  */
}
