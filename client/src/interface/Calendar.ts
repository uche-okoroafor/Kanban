export interface ICard {
  _id?: number;
  start?: Date | undefined;
  end?: Date | undefined;
  title?: string;
  tagColor?: string;
  checkList?: string[];
  comment?: string;
  attachement?: string;
  cover?: string;
}
