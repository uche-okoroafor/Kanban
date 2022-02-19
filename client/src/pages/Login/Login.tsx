import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login, { demoLogin } from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import KanbanLogo from '../../Images/logo.png';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const handleDemoLogin = () => {
    login('demo@gmail.com', '123456').then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={5} md={6} className={classes.backgroundImg}>
        <Box p={4}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bolder', color: 'white' }}>
            Kanban
          </Typography>
          {/* <img src={KanbanLogo} alt="logo" /> */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Paper style={{ alignSelf: 'center', width: '55%' }} elevation={5}>
            <Box p={2} className={classes.loginHeader}>
              <Typography style={{ color: '#FFBA32' }}>Already have an Account ?</Typography>
            </Box>

            <Box width="100%" style={{ position: 'relative' }} p={2} maxWidth={450} alignSelf="center">
              <LoginForm handleSubmit={handleSubmit} handleDemoLogin={handleDemoLogin} />
            </Box>
          </Paper>

          <Box display={'flex'} flexDirection="column" m={4} alignItems={'center'} justifyContent="center">
            <Typography color="textSecondary"> Don&apos;t have an account yet ? </Typography>
            <Button style={{ color: '#1A545C', margin: '2px' }} onClick={() => history.push('/signup')}>
              Create an account
            </Button>
            <Button style={{ color: '#1A545C' }} onClick={handleDemoLogin}>
              Demo
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
