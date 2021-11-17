import {
  UpdateColumnParam,
  MoveColumnParam,
  MoveCardWithinColumnParam,
  MoveCardOutsideColumnParam,
} from '../../interface/Column';
import { FetchOptions } from '../../interface/FetchOptions';

export const updateColumn = async (data: UpdateColumnParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    return await fetch('/column/update-column', fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const moveColumn = async (data: MoveColumnParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    return await fetch('/column/move-column', fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const moveCardWithinColumn = async (data: MoveCardWithinColumnParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    return await fetch('/column/move-card-within-column', fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const moveCardOutsideColumn = async (data: MoveCardOutsideColumnParam): Promise<Response> => {
  try {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    return await fetch('/column/move-card-outside-column', fetchOptions).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
