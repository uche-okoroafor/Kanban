import { Container } from '@material-ui/core';
import cards from '../../mocks/cards';
import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { ICard } from '../../interface/Calendar';
import { CardContainer, DayHeader, MonthHeader } from './CalendarComponents/CalendarComponents';
import './styles.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const BigCalendar: FC = () => {
  const [events, setEvents] = useState<ICard[]>(cards);

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end, event } = data;
    const draggedEvent: ICard = event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(end);
    const filteredEvents = events.filter((event: ICard) => event._id !== draggedEvent._id);
    setEvents([...filteredEvents, draggedEvent]);
  };

  return (
    <Container>
      <DnDCalendar
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        style={{
          height: '100vh',
        }}
        views={{
          month: true,
        }}
        components={{
          month: {
            dateHeader: DayHeader,
            event: CardContainer,
            header: MonthHeader,
          },
        }}
      />
    </Container>
  );
};

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export default BigCalendar;
