export interface User {
  email: string;
  username: string;
  activeBoard?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
