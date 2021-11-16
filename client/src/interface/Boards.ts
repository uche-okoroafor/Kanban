export interface ICard {
  _id: string;
  cardTitle: string;
  tagColor: string;
  description: string;
  comment: string;
  deadline: string;
  checklist: {
    item: string;
    isChecked: boolean;
    _id: string;
  }[];
  attachment: {
    imageName: string;
    imageSource: string;
    _id: string;
  };
}

export interface IBoard {
  _id: string;
  boardTitle: string;
  columns: {
    _id: string;
    columnTitle: string;
    cards: ICard[];
  }[];
}

export interface IIds {
  cardId: string;
  columnId: string;
  boardId: string;
}

export interface ICardResponse {
  success: boolean;
  data?: { success: boolean };
  error?: { message: string };
}

export interface IBoardResponse {
  boards: IBoard[];
  error?: { message: string };
}
