import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBarContainer: {
    backgroundColor: '#759cfc',
  },
  appBarItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0% 2%',
  },
  appBarTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  menuButton: {
    color: 'white',
    border: '2px solid white',
  },
});

export default useStyles;
