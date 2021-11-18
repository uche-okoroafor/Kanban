import { ComponentType } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';
import { User } from './User';

/**
 * ProtectedRoute component prop
 * type definitions.
 * @interface
 */
export interface ProtectedRouteProps extends RouteProps {
  token: User | null | undefined;
  component: ComponentType<RouteComponentProps>;
}
