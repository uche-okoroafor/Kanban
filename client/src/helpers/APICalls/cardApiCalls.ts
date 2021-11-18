import { FetchOptions } from '../../interface/FetchOptions';
import { IIds, ICardResponse } from '../../interface/Boards';

export async function saveCardItem(
  cardItem: string,
  value: string | undefined | Date,
  ids: IIds | undefined,
): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardItem, value, cardId: ids?.cardId, boardId: ids?.boardId, columnId: ids?.columnId }),
    credentials: 'include',
  };
  return await fetch(`/card/update-card/item`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function deleteCardItem(
  cardItem: string,
  value: string | undefined | Date,
  ids: IIds | undefined,
): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardItem, value, cardId: ids?.cardId, boardId: ids?.boardId, columnId: ids?.columnId }),
    credentials: 'include',
  };
  return await fetch(`/card/remove-card/item`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
