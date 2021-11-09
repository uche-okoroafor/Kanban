import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Calendar from './pages/Calendar/Calendar';

import { useImmerReducer } from 'use-immer';
import { authReducer, authState } from './state';
import './App.css';

function App(): JSX.Element {
  const [state] = useImmerReducer(authReducer, authState);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <SocketProvider>
            <Switch>
              <ProtectedRoute exact path="/" token={state.token} component={Dashboard} />
              <Route path="/Dashboard" component={Dashboard} />

              <Route path="/login" component={Login} />

              <Route path="/calendar" component={Calendar} />
              <Route path="/signup" component={Signup} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </SocketProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
