import login from '../helpers/APICalls/login';
import { useAuth } from '../context/useAuthContext';
import { useSnackBar } from '../context/useSnackbarContext';

const useDemoLogin = (): { demoLogin: () => void } => {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const demoLogin = (): void => {
    login('DEMO_LOGIN').then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        updateSnackBarMessage('Unexpected error! Please try again');
      }
    });
  };

  return { demoLogin };
};

export default useDemoLogin;
