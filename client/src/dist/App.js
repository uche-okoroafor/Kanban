'use strict';
exports.__esModule = true;
var core_1 = require('@material-ui/core');
var theme_1 = require('./themes/theme');
var react_router_dom_1 = require('react-router-dom');
var Login_1 = require('./pages/Login/Login');
var SignUp_1 = require('./pages/SignUp/SignUp');
var Dashboard_1 = require('./pages/Dashboard/Dashboard');
var Calendar_1 = require('./pages/Calendar/Calendar');
var useAuthContext_1 = require('./context/useAuthContext');
var useSocketContext_1 = require('./context/useSocketContext');
var useSnackbarContext_1 = require('./context/useSnackbarContext');
require('./App.css');
function App() {
  return React.createElement(
    core_1.MuiThemeProvider,
    { theme: theme_1.theme },
    React.createElement(
      react_router_dom_1.BrowserRouter,
      null,
      React.createElement(
        useSnackbarContext_1.SnackBarProvider,
        null,
        React.createElement(
          useAuthContext_1.AuthProvider,
          null,
          React.createElement(
            useSocketContext_1.SocketProvider,
            null,
            React.createElement(
              react_router_dom_1.Switch,
              null,
              React.createElement(react_router_dom_1.Route, {
                exact: true,
                path: '/login',
                component: Login_1['default'],
              }),
              React.createElement(react_router_dom_1.Route, {
                exact: true,
                path: '/signup',
                component: SignUp_1['default'],
              }),
              React.createElement(react_router_dom_1.Route, {
                exact: true,
                path: '/calendar',
                component: Calendar_1['default'],
              }),
              React.createElement(
                react_router_dom_1.Route,
                { exact: true, path: '/dashboard' },
                React.createElement(Dashboard_1['default'], null),
              ),
              React.createElement(
                react_router_dom_1.Route,
                { path: '*' },
                React.createElement(react_router_dom_1.Redirect, { to: '/login' }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
exports['default'] = App;
