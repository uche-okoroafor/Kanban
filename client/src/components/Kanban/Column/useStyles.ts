import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    fontWeight: 'bold',
  },
  typographyWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  columnWrapper: {
    padding: 16,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 8,
    maxWidth: '50%',
    boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.30)',
  },
  columnGridItem: {
    [theme.breakpoints.up('lg')]: {
      flex: 1,
    },

  },
}));

export default useStyles;
