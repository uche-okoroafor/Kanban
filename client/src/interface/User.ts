export interface User {
  email: string;
  username: string;
  profileUrl: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
