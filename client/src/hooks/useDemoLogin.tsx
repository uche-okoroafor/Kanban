import login from '../helpers/APICalls/login';
import { useAuth } from '../context/useAuthContext';
import { useSnackBar } from '../context/useSnackbarContext';
import { useImmerReducer } from "use-immer"
import { authReducer, authState } from '../state';
import { useHistory } from 'react-router-dom';

const useDemoLogin = (): { demoLogin: () => void } => {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [state, dispatch] = useImmerReducer(authReducer, authState)
  const history = useHistory()
  console.log(state)
  const demoLogin = () => {
    login('DEMO_LOGIN').then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        dispatch({type: "LOG_IN_USER", payload: data.success.token})
        history.push("/")
      } else {
        updateSnackBarMessage('Unexpected error! Please try again');
      }
    });
  };

  return { demoLogin };
};

export default useDemoLogin;
