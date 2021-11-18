export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

/**
 * Authentication state type definition
 * @interface
 */
export interface AuthState {
  token: string;
}

/**
 * Login user action creator
 * type definition.
 * @interface
 */
export interface LoginUserAction {
  type: typeof LOG_IN_USER;
  payload: string;
}

/**
 * Logout user action creator
 * type definition.
 * @interface
 */
export interface LogOutUserAction {
  type: typeof LOG_OUT_USER;
  payload: string;
}

/**
 * Authentication actions
 * type definition.
 * @type
 */
export type AuthActionTypes = LoginUserAction | LogOutUserAction;

/**
 * Auth reducer type definition.
 * @type
 */
export type AuthReducer = (draft: AuthState, action: AuthActionTypes) => void;
