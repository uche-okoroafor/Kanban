import { makeStyles } from '@material-ui/core/styles';
import image from '../../Images/background.jpg';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
    background: '#FFBA32',
  },

  loginHeader: {
    padding: '20px',
    fontWeight: 'bolder',
    boxShadow: '1px 7px 5px -3px rgba(0,0,0,0.18)',
    webkitBoxShadow: '1px 7px 5px -3px rgba(0,0,0,0.18)',
    mozBoxShadow: '1px 7px 5px -3px rgba(0,0,0,0.18)',
  },

  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
}));

export default useStyles;
