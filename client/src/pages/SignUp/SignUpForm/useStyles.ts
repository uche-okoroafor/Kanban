import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  label: {
    // fontSize: 10,
    color: 'rgb(0,0,0,0.4)',
    // paddingLeft: '5px',
  },
  inputs: {
    // marginTop: '.8rem',
    // height: '1.5rem',
    // padding: '15px',
  },
  textField: {
    '& .MuiFormLabel-root': {
      // color: 'black',
    },
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    width: '100%',
    padding: 10,
    height: 56,
    marginTop: 24,
    fontSize: 16,
    backgroundColor: '#1A545C',
    fontWeight: 'bold',
  },
}));

export default useStyles;
