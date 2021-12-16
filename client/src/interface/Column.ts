import { Card } from './Card';

export interface IColumn {
  _id: string;
  columnTitle: string;
  cards: Array<Card>;
  createdAt: Date;
}
export interface Column {
  _id: string;
  columnTitle: string;
  cards: Array<Card>;
  createdAt: Date;
}
