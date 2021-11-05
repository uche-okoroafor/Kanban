import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectedRouteProps } from '../../interface/Route';

/**
 * Protected route component for handling routing
 * based on user authentication status.
 * @param ProtectedRouteProps
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ token, ...rest }: ProtectedRouteProps): JSX.Element => {
  return token ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
