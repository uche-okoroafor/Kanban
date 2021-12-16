export interface Card {
  _id: string;
  columnId: string;
  cardTitle: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
  comment?: string;
}

export interface ICard {
  _id: string;
  cardTitle?: string;
  tag?: string;
  description?: string;
  comment?: string;
  dueDate?: Date;
  checklist?: {
    item: string;
    isChecked: boolean;
    _id: string;
  }[];
  attachment?: {
    imageName: string;
    imageSource: string;
    _id: string;
  };
}
