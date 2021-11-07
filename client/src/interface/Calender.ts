import { Event } from '@material-ui/icons';

export interface Event {
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
  event: Event;
  isAllDay: boolean | null;
  localizer?: undefined;
  slotEnd: number;
  slotStart: number;
  title: string;
}
