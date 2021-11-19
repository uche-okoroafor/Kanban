import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectedRouteProps } from '../../interface/Route';
import { useAuth } from '../../context/useAuthContext';

/**
 * Protected route component for handling routing
 * based on user authentication status.
 * @param ProtectedRouteProps
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ ...rest }: ProtectedRouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
