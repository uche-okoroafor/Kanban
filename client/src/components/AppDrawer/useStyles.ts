import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  paper: {
    width: drawerWidth,
    height: '100%',
  },
});

export default useStyles;
