import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { ProtectedRouteProps } from '../../interface/Route';

/**
 * Protected route component for handling routing
 * based on user authentication status.
 * @param ProtectedRouteProps
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ component: Component, token, ...rest }: ProtectedRouteProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        if (token) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
