import { makeStyles } from '@material-ui/core';

const useStlyes = makeStyles({
  root: {
    marginTop: '2%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  navButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default useStlyes;
