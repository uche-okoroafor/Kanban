import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { demoLogin } from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { createDefaultBoard } from '../../helpers/APICalls/boardApiCalls';
import { useBoard } from '../../context/useBoardContext';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AuthBackground from '../../components/AuthBackground/AuthBackground';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoard } = useBoard();
  const history = useHistory();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then(async (data): Promise<void> => {
      if (data.error) {
        console.error({ error: data.error });
        setSubmitting(false);
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        await handleCreateDefaultBoard();
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleCreateDefaultBoard = async (): Promise<void> => {
    createDefaultBoard().then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateBoard();
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AuthBackground />

      <Grid item xs={12} sm={8} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          {' '}
          <Paper style={{ alignSelf: 'center', width: '55%' }} elevation={5}>
            <Box p={2} className={classes.loginHeader}>
              <Typography style={{ color: '#FFBA32' }}> Don&apos;t have an account yet ?</Typography>
            </Box>
            <Box width="100%" style={{ position: 'relative' }} p={2} maxWidth={450} alignSelf="center">
              <SignUpForm handleSubmit={handleSubmit} />
            </Box>
            <Box p={1} alignSelf="center" />
          </Paper>
          <Box display={'flex'} flexDirection="column" m={4} alignItems={'center'} justifyContent="center">
            <Typography color="textSecondary">Already have an Account ?</Typography>
            <Button style={{ color: '#1A545C', margin: '2px' }} onClick={() => history.push('/login')}>
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
