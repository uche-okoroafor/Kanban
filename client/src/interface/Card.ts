export interface Card {
  id: string;
  columnId: string;
  name: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
  comment?: string;
}

export interface ICard {
  id: string;
  name?: string;
  tag?: string;
  description?: string;
  comment?: string;
  dueDate?: Date;
  checklist?: {
    item: string;
    isChecked: boolean;
    id: string;
  }[];
  attachment?: {
    imageName: string;
    imageSource: string;
    id: string;
  };
}
