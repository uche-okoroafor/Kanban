import { Card } from './Card';

export interface Column {
  id: string;
  name: string;
  cards: Array<Card>;
  createdAt: Date;
}

interface ColumnRequestParam {
  columnTitle?: string;
  columnId: string;
}

export interface UpdateColumnParam extends ColumnRequestParam {
  boardId: string;
}

export interface MoveColumnParam extends ColumnRequestParam {
  boardId: string;
  targetPosition: number;
  columnObject: Record<string, unknown>;
}

export interface MoveCardWithinColumnParam extends ColumnRequestParam {
  boardId: string;
  targetPosition: number;
  cardId: string;
  cardObject: Record<string, unknown>;
}

export interface MoveCardOutsideColumnParam extends ColumnRequestParam {
  boardId: string;
  targetPosition: number;
  cardId: string;
  cardObject: Record<string, unknown>;
  initialColumnId: string;
  targetColumnId: string;
}
