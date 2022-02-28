import { makeStyles } from '@material-ui/core';

const useStlyes = makeStyles({
  createButton: {
    backgroundColor: '#1A545C',
    padding: '10px',
    fontSize: '16px',
    margin: '0 1rem',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#0f3b41',
    },
  },
  navButton: {
    color: '#1A545C',
    border: 'none',
    fontSize: '16px',
  },
});

export default useStlyes;
