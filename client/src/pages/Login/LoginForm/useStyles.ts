import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  label: {
    // fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    // paddingLeft: '5px',
  },
  inputs: {
    // padding: '5px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    padding: 10,
    width: '100%',
    height: 56,
    marginTop: 25,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#1A545C',
    fontWeight: 'bold',
  },
}));

export default useStyles;
