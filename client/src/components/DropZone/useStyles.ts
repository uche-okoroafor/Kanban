import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  inputContainer: {
    margin: '5%',
  },
  input: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  uploadContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    marginTop: '5%',
    borderRadius: '9px',
    padding: '10%',
  },
}));

export default useStyles;
