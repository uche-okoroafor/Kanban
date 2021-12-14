import { Card } from './Card';

export interface IColumn {
  _id: string;
  name: string;
  cards: Array<Card>;
  createdAt: Date;
}
export interface Column {
  _id: string;
  name: string;
  cards: Array<Card>;
  createdAt: Date;
}
