import { Column } from './Column';
//import { Card } from './Card';

export interface Board {
  id: string;
  boardTitle: string;
  columns: Array<Column>;
  createdAt: string;
}
