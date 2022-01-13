export interface ICard {
  _id?: string;
  start?: Date | undefined;
  end?: Date | undefined;
  title?: string;
  tagColor?: string;
  checkList?: string[];
  comment?: string;
  attachement?: string;
  cover?: string;
  columnId?: string;
  boardId?: string;
}
