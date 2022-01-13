import { FetchOptions } from '../../interface/FetchOptions';
import { IIds, ICardResponse } from '../../interface/Board';
import { Card, ICard } from '../../interface/Card';
import { Column } from '../../interface/Column';

export async function addColumn({
  columnTitle,
  boardId,
  targetPosition,
}: {
  columnTitle: string;
  boardId: string | undefined;
  targetPosition: number | undefined;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnTitle, boardId, targetPosition }),
    credentials: 'include',
  };
  return await fetch(`/column/create-column`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function deleteColumn({
  columnId,
  boardId,
}: {
  columnId: string | undefined;
  boardId: string | undefined;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnId, boardId }),
    credentials: 'include',
  };
  return await fetch(`/column/remove-column`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function moveCardWithinColumn({
  card,
  cardId,
  columnId,
  boardId,
  targetPosition,
}: {
  card: Card | undefined;
  cardId: string;
  columnId: string;
  boardId: string | undefined;
  targetPosition: number;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ card, cardId, columnId, boardId, targetPosition }),
    credentials: 'include',
  };
  return await fetch(`/column/move-card-within-column`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function moveCardOutsideColumn({
  cardId,
  initialColumnId,
  targetColumnId,
  boardId,
  targetPosition,
  card,
}: {
  card: Card | undefined;
  cardId: string;
  initialColumnId: string;
  targetColumnId: string;
  boardId: string | undefined;
  targetPosition: number;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardId, initialColumnId, targetColumnId, boardId, targetPosition, card }),
    credentials: 'include',
  };
  return await fetch(`/column/movd-card-outside-column`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function moveColumns({
  columnId,
  boardId,
  targetPosition,
  column,
}: {
  column: Column | undefined;
  columnId: string;
  boardId: string | undefined;
  targetPosition: number;
}): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnId, boardId, targetPosition, column }),
    credentials: 'include',
  };
  return await fetch(`/column/move-column`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
