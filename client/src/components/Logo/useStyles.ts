import { makeStyles } from '@material-ui/core';

const useStlyes = makeStyles({
  root: {
    padding: '0% 2%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default useStlyes;
