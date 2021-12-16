import { DropResult } from 'react-beautiful-dnd';
import { Card } from './Card';
import { IColumn } from './Column';

export interface KanbanContext {
  focusedBoardId: string | undefined;
  columns: IColumn[];
  focusedCard: Card | null;
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: Card) => boolean;
  setOpenCard: (card: Card) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn | null;
}
