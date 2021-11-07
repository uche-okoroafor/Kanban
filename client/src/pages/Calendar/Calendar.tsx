import { Container, Box, Typography } from '@material-ui/core';
import tasks from './event';
import { FC, useState, useEffect, PropsWithChildren } from 'react';
import { Calendar, dateFnsLocalizer, EventProps } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';
import { Event, EventDetails } from '../../interface/Calender';
import './styles.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';

const Card = ({ event }?: EventDetails): JSX.Element => {
  // console.log(props);
  return (
    <>
      <Box
        style={{
          height: '5px',
          width: '20%',
          background: event.tagColor,
          borderRadius: '10px',
        }}
      ></Box>
      <Typography variant="h6" className="eventTitle">
        {event.title}
      </Typography>
    </>
  );
};

// interface ICard {
//   id: string;
//   title: string;
//   color: string;
//   start: Date | string;
//   end: Date | string;
//   attachement?: string;
//   checkList?: string[];
//   comment?: string;
//   cover?: string;
//   description?: string;
//   tag?: string;
// }

const CalendarPage: FC = () => {
  const [events, setEvents] = useState<Event[]>(tasks);

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end } = data;
    const draggedEvent: Event = data.event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(end);
    const filteredEvents = events.filter((event: Event) => event.id !== draggedEvent.id);
    setEvents([...filteredEvents, draggedEvent]);
  };

  return (
    <Container style={{ backgroundColor: 'white' }}>
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
        }}
      />
    </Container>
  );
};

const locales = {
  'en-US': enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
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

// '({ id: number; title: string; allDay: boolean; start: Date; end: Date; desc?: undefined; } | { id: number; title: string; start: Date; end: Date; allDay?: undefined; desc?: undefined; } | { ...; })[]'
