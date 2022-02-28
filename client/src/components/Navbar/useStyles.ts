import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '10px',
    display: 'flex',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default useStyles;
