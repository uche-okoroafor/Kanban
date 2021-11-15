import { DropResult } from 'react-beautiful-dnd';
import { Card } from './Card';
import { Column } from './Column';

export interface KanbanContext {
  columns: Column[];
  focusedCard: Card | null;
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: Card) => boolean;
  setOpenCard: (card: Card) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => Column | null;
}
