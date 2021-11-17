import { FetchOptions } from '../../interface/FetchOptions';

export const createDefaultBoard = async (): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    return await fetch('/board/create/default-board', fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
