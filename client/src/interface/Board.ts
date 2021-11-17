import { Column } from './Column';
import { Card } from './Card';

export interface Board {
  id: string;
  name: string;
  columns: Array<Column>;
  cards: Array<Card>;
  user: string;
  createdAt: string;
}
