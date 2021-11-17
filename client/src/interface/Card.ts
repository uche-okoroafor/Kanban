export interface Card {
  id: string;
  columnId: string;
  name: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
}

export interface CreateCardParam {
  cardTitle: string;
  tagColor: string;
  columnId: string;
  boardId: string;
}

export interface UpdateCardItemsParam {
  cardItem: string;
  value: string;
  cardId: string;
  columnId: string;
  boardId: string;
}

export interface RemoveCardItemsParam {
  cardItem: string;
  cardId: string;
}
