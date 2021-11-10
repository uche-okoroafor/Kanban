import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import DropZone from '../../components/DropZone/DropZone';
import RenderFile from '../../components/RenderFile/RenderFile';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [file, setFile] = useState<{ [prop: string]: string | number } | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

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
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner onHandleOpen={handleOpen} loggedInUser={loggedInUser} />
        <DropZone open={open && !file} onHandleClose={handleClose} onSetFile={setFile} />
        <RenderFile
          onHandleClose={handleClose}
          file={file}
          open={file ? true : false}
          onSetFile={setFile}
          setOpen={setOpen}
        />
      </Grid>
    </Grid>
  );
}
