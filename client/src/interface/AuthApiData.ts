import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}

export interface DemoAuthData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
