import { Column } from './Column';
//import { Card } from './Card';

export interface Board {
  boardId: string;
  boardTitle: string;
  columns: Array<Column>;
  createdAt: string;
}
