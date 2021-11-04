import { Container, Box } from '@material-ui/core';
import event from './event';
import { FC, useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';
import './styles.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface IEvents {
  id?: number;
  start?: Date | undefined;
  end?: Date | undefined;
  title?: string;
  allDay?: boolean | undefined;
  color?: string;
}

const CalendarPage: FC = () => {
  const [events, setEvents] = useState<IEvents[]>(event);
  const spanCard = document.createElement('span');
  const divCard = document.createElement('div');
  // const cardContentContainer = document.createElement('div');
  const eventElement = document.getElementsByClassName('rbc-event');
  const text = document.createTextNode('uche okoroafor');
  spanCard.appendChild(text);
  // element.classList.add('class-1')
  // eventElement[0].appendChild(spanCard);

  // if (eventElement) {
  //   for (const index in eventElement) {
  //     eventElement[index].appendChild(spanCard);
  //     eventElement[index].appendChild(divCard);
  //   }
  // }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  // const span = document.createElement('span');
  // const text = document.createTextNode('new text');
  // span.appendChild(text);

  // document.querySelectorAll('.rbc-event')[0].appendChild(span);
  // eventContainer.forEach((element) => element.appendChild(span));
  // console.log(document.querySelectorAll('.rbc-addons-dnd-resize-ew-anchor div'));
  // document.querySelector('rbc-event div')
  // document.querySelectorAll('.rbc-event').push(span);

  // const eventContainer =

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end } = data;
    const draggedEvent: IEvents = data.event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(end);
    const filteredEvents = events.filter((event: IEvents) => event.id !== draggedEvent.id);
    setEvents([...filteredEvents, draggedEvent]);
    // for (const index in eventElement) {
    //   eventElement[index].appendChild(spanCard);
    //   eventElement[index].appendChild(divCard);
    // }
    document.getElementsByClassName('rbc-event')[0].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[1].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[2].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[3].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[4].appendChild(spanCard);
    document.getElementsByClassName('rbc-event')[5].appendChild(spanCard);
    // document.getElementsByClassName('rbc-event')[6].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[7].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[0].appendChild(divCard);
    // document.getElementsByClassName('rbc-event')[0].appendChild(divCard);
    // updateCardItem("cardDealine",cardId,boardId,columnId,userId,value)
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
