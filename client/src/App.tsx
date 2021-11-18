import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import Calender from './pages/Calender/Calender';
import AppLayout from './components/AppLayout/AppLayout';
import { KanbanProvider } from './context/useKanbanContext';
import { useAuth } from './context/useAuthContext';

function App(): JSX.Element {
  const { loggedInUser } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <SocketProvider>
            <KanbanProvider>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route
                  render={(props: RouteComponentProps) => (
                    <AppLayout {...props}>
                      <ProtectedRoute exact path="/" token={loggedInUser} component={Dashboard} />
                      <ProtectedRoute path="/calender" token={loggedInUser} component={Calender} />
                    </AppLayout>
                  )}
                />
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </KanbanProvider>
          </SocketProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
