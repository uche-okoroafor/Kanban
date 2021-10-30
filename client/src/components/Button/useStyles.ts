import { makeStyles } from '@material-ui/core';

const useStlyes = makeStyles({
  createButton: {
    backgroundColor: '#759cfc',
    padding: '5%',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#99b5fc',
    },
  },
  navButton: {
    color: '#759cfc',
    border: 'none',
    fontSize: '16px',
  },
});

export default useStlyes;
