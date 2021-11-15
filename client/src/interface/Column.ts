import { Card } from './Card';

export interface Column {
  id: string;
  name: string;
  cards: Array<Card>;
  createdAt: Date;
}
