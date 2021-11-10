import { AuthApiData, DemoAuthData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const login = async (option: string, email?: string, password?: string): Promise<AuthApiData> => {
  switch (option) {
    case 'USER_LOGIN':
      const fetchOptions: FetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      };
      return await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
          error: { message: 'Unable to connect to server. Please try again' },
        }));
    case 'DEMO_LOGIN':
      return await fetch(`${process.env.REACT_APP_SERVER}/auth/demo-login`, {
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .catch(() => ({
          error: { message: 'Unable to connect to server in demo mode. Please try again' },
        }));
    default:
      throw new Error('Something went wrong!');
  }
};

export default login;
