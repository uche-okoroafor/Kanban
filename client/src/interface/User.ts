export interface User {
  email: string;
  username: string;
  activeBoard?: string;
  imageUrl?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: string;
}
