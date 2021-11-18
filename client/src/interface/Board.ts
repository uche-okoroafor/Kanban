import { Column } from './Column';
import { Card } from './Card';
import { ICard } from './Card';

export interface Board {
  id: string;
  name: string;
  columns: Array<Column>;
  cards: Array<Card>;
  user: string;
  createdAt: string;
}

export interface IBoard {
  id: string;
  boardTitle: string;
  columns: {
    id: string;
    columnTitle: string;
    cards: ICard[];
  }[];
}

export interface IIds {
  cardId: string;
  columnId: string;
  boardId: string;
}
