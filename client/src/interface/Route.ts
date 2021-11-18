import { ComponentType } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

/**
 * ProtectedRoute component prop
 * type definitions.
 * @interface
 */
export interface ProtectedRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps>;
}
