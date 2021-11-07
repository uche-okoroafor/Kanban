import { Container, Box, Typography } from '@material-ui/core';
import tasks from './event';
import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { CardEvent } from '../../interface/Calender';
import Card from './Card/Card';
import './styles.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DateHeader = (props: any): JSX.Element => {
  // console.log(props);
  return (
    <>
      {!props.isOffRange && (
        <Typography
          style={{
            padding: '7px 5px',
            color: ' #899ad7',
            fontWeight: 600,
          }}
          align="left"
        >
          {props.label[0] === '0' ? props.label[1] : props.label}
        </Typography>
      )}
    </>
  );
};

const MonthHeader = (props: any): JSX.Element => {
  return (
    <>
      {!props.isOffRange && (
        <Typography
          style={{
            padding: '7px 5px',
            color: ' #899ad7',
            fontWeight: 600,
          }}
        >
          {props.label.slice(0, 3)}
        </Typography>
      )}
    </>
  );
};

const CalendarPage: FC = () => {
  const [events, setEvents] = useState<CardEvent[]>(tasks);

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end } = data;
    const draggedEvent: CardEvent = data.event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(end);
    const filteredEvents = events.filter((event: CardEvent) => event.id !== draggedEvent.id);
    setEvents([...filteredEvents, draggedEvent]);
  };

  return (
    <Container>
      <DnDCalendar
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        defaultDate={new Date(2015, 3, 12)}
        style={{
          height: '100vh',
        }}
        views={{
          month: true,
        }}
        components={{
          event: Card,
          month: {
            dateHeader: DateHeader,
            event: Card,
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

export default CalendarPage;
