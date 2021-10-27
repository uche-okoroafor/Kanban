import { AuthReducer, AuthState, LOG_IN_USER, LOG_OUT_USER } from '../../interface/AuthContext';

/**
 * Authentication state.
 */
export const authState: AuthState = {
  token: '',
};

/**
 * Authentication reducer for
 * managing auth state.
 * @function
 * @param draft
 * @param action
 * @returns
 */
export const authReducer: AuthReducer = (draft, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return (draft['token'] = action.payload);
    case LOG_OUT_USER:
      return (draft['token'] = action.payload);
    default:
      return draft;
  }
};
