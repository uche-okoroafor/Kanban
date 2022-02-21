import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addColumn: {
    position: 'absolute',
    width: '2px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1A545C',
    ZIndex: 5,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'width 0.4s',
    boxShadow: ' 0px 0px 14px 2px rgba(0,0,0,0.75)',

    '&:hover': {
      width: '50px',
      transition: 'width 0.4s',
    },
  },
}));

export default useStyles;
