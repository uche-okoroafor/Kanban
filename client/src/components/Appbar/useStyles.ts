import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  appBarContainer: {
    backgroundColor: '#759cfc',
  },
  appBarItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBarTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  menuButton: {
    color: 'white',
  },
});

export default useStyles;
