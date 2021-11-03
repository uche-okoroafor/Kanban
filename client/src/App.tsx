import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

/*
// removed for develop-ankit branch, integrate later
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useImmerReducer } from 'use-immer';
import { authReducer, authState } from './state';
*/

import './App.css';

function App(): JSX.Element {
  // removed for develop-ankit branch, integrate later
  //const [state] = useImmerReducer(authReducer, authState);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
              <SocketProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </SocketProvider>
            </AuthProvider>
          {
          // removed for develop-ankit branch, integrate later
          /*<SocketProvider>
            <Switch>
              <ProtectedRoute exact path="/" token={state.token} component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </SocketProvider>*/
          }
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
