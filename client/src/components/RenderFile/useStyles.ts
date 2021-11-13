import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dropBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: '24',
    padding: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  imageBox: {
    height: '16rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    height: '3rem',
    width: '3rem',
    margin: '2rem',
  },
  typography: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  buttonStyle: {
    marginBottom: 16,
    marginTop: '2rem',
    width: '80%',
  },
});

export default useStyles;
