import { CreateCardParam, RemoveCardItemsParam, UpdateCardItemsParam } from '../../interface/Card';
import { FetchOptions } from '../../interface/FetchOptions';

export const createCard = async (data: CreateCardParam): Promise<Response> => {
  try {
    const { boardId, columnId, cardTitle, tagColor } = data;
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    return await fetch(`/card/create-card/${boardId}/${columnId}/${cardTitle}/${tagColor}`, fetchOptions).then((res) =>
      res.json(),
    );
  } catch (error) {
    throw error;
  }
};

export const updateCardItems = async (data: UpdateCardItemsParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    return await fetch(`/card/update-card/item`, fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const removeCardItems = async (data: RemoveCardItemsParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    return await fetch(`/card/remove-card/item`, fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
