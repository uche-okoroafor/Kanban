import { FetchOptions } from '../../interface/FetchOptions';
import { IIds, ICardResponse } from '../../interface/Board';

export async function createCard(
  boardId: string,
  columnId: string,
  cardTitle: string,
  tagColor: string,
): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boardId, columnId, cardTitle, tagColor }),
    credentials: 'include',
  };
  return await fetch(`/card/create-card`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateCardItem(
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

export async function deleteCard({
  columnId,
  boardId,
  cardId,
}: {
  columnId: string | undefined;
  boardId: string | undefined;
  cardId: string | undefined;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnId, boardId, cardId }),
    credentials: 'include',
  };
  return await fetch(`/card/delete-card`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
