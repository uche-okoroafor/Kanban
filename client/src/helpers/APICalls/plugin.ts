import { FetchOptions } from '../../interface/FetchOptions';
import { IIds, ICardResponse } from '../../interface/Boards';

export async function saveCheckListItem(checklistItem: string): Promise<ICardResponse> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checklistItem }),
    credentials: 'include',
  };
  return await fetch(`/plugins/checklist/activate`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
