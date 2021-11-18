import { FetchOptions } from '../../interface/FetchOptions';
import { IBoardResponse } from '../../interface/Boards';

export async function getUserBoards(): Promise<IBoardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/board/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
