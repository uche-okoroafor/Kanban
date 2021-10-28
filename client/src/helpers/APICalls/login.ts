import { AuthApiData, DemoAuthData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

export const demoLogin = async (email: string, password: string): Promise<DemoAuthData> => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return await fetch(`${process.env.PUBLIC_URL}/auth/demo-login`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server in demo mode. Please try again' },
    }));
};

const login = async (email: string, password: string): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };
  return await fetch(`/auth/login`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default login;
