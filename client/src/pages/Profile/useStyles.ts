import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '3%',
    backgroundColor: '#fffff',
    borderWidth: '1px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  avatarContainer: {
    display: 'flex',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  input: {
    marginBottom: '4%',
  },
  buttonContainer: {
    marginBottom: '5%',
    backgroundColor: '#759cfc',
    padding: '2%',
    fontSize: '16px',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#99b5fc',
    },
  },
}));

export default useStyles;
