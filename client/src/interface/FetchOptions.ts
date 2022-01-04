export interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
  credentials: RequestCredentials;
}

export interface IResponse {
  success: boolean;
  error?: { message: string };
}
