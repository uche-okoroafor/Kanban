export interface User {
  email: string;
  username: string;
  imageUrl: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
