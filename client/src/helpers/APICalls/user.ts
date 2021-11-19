import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

export default async function getUser(id?: string): Promise<User> {
  try {
    const fetchOptions: FetchOptions = {
      method: 'GET',
      credentials: 'include',
    };
    return await fetch(`/users/${id}`, fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
}
