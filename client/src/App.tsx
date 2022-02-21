import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Calendar from './pages/Calendar/Calendar';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import { BoardProvider } from './context/useBoardContext';
import { KanbanProvider } from './context/useKanbanContext';
import { AuthProvider } from './context/useAuthContext';
function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <SnackBarProvider>
            <SocketProvider>
              <BoardProvider>
                <KanbanProvider>
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route
                      render={(props: RouteComponentProps) => (
                        <AppLayout {...props}>
                          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                          <ProtectedRoute path="/calendar" component={Calendar} />
                          <ProtectedRoute path="/profile" component={Profile} />
                        </AppLayout>
                      )}
                    />
                    <Route path="/">
                      <Redirect to="/login" />
                    </Route>
                    <Route path="*">
                      <Redirect to="/login" />
                    </Route>
                  </Switch>{' '}
                </KanbanProvider>
              </BoardProvider>
            </SocketProvider>
          </SnackBarProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
