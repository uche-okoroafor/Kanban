import { AuthReducer, AuthState, LOG_IN_USER, LOG_OUT_USER } from '../../interface/AuthContext';
import produce from "immer"

export const authState: AuthState = {
  token: '',
};

/**
 * Authentication reducer for
 * managing auth state..
 * @function
 * @param draft
 * @param action
 * @returns
 */
export const authReducer: AuthReducer = produce((draft, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      draft['token'] = action.payload;
      return draft
    case LOG_OUT_USER:
      draft['token'] = action.payload;
      return draft;
    default:
      return draft;
  }
});
