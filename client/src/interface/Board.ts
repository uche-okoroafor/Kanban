import { IColumn } from './Column';
import { Card } from './Card';
import { ICard } from './Card';

export interface Board {
  _id: string;
  boardTitle: string;
  columns: Array<IColumn>;
  cards: Array<Card>;
  user: string;
  createdAt: string;
}

export interface IBoard {
  _id: string;
  boardTitle: string;
  columns: Array<IColumn>;
}

export interface IIds {
  cardId?: string;
  columnId?: string;
  boardId?: string;
}

export interface ICardResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface IBoardResponse {
  boards: IBoard[];
  error?: string;
  activeBoard: string;
}
