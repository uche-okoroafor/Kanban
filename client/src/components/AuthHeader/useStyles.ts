import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  authHeader: {
    borderTop: '1px solid #E8E8E8',
    width: '100%',
    padding: '3rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accAside: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    padding: '0.5rem 0',
  },
  link: { textDecoration: 'none', textAlign: 'center' },
  accBtn: { color: '#3a8dff', textAlign: 'center' },
}));

export default useStyles;
