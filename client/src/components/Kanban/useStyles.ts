import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addColumn: {
    position: 'absolute',
    width: '2px',
    color: 'white',
    background: '#759CFC',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      background: '#759CFC',
      width: '50px',
    },
  },
}));

export default useStyles;
