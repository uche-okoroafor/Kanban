export interface CardEvent {
  id?: number;
  start?: Date | undefined;
  end?: Date | undefined;
  title?: string;
  allDay?: boolean | undefined;
  tagColor?: string;
}

export interface EventDetails {
  continuesAfter: boolean;
  continuesPrior: boolean;
  event: CardEvent;
  isAllDay: boolean | null;
  localizer?: undefined;
  slotEnd: number;
  slotStart: number;
  title: string;
}

export interface ICard {
  id: string;
  title: string;
  color: string;
  cover?: string;
  description?: string;
  tag?: string;
  start: Date | string;
  end: Date | string;
  checkList?: string[];
  comment?: string;
  attachement?: string;
}
