import { Board } from './Board';

export interface User {
  id?: string;
  email: string;
  username: string;
  boards?: Board[];
}

export interface SearchUsersApiData {
  users: User[];
  error?: { message: string };
}
