import { Container } from '@material-ui/core';
import { FC, useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { ICard } from '../../interface/Calendar';
import { CardContainer, DayHeader, MonthHeader } from './CalendarComponents/CalendarComponents';
import { useBoard } from '../../context/useBoardContext';
import './styles.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { updateCardItem } from '../../helpers/APICalls/cardApiCalls';
import { useSnackBar } from '../../context/useSnackbarContext';
import { IIds } from '../../interface/Board';
// import cards from '../../mocks/cards';

const BigCalendar: FC = () => {
  const { updateBoard, cards } = useBoard();
  const [events, setEvents] = useState<ICard[] | undefined>(cards);
  const { updateSnackBarMessage } = useSnackBar();

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end, event } = data;
    const draggedEvent: ICard = event;
    draggedEvent.start = new Date(start);
    draggedEvent.end = new Date(start);
    handleSaveDeadline(draggedEvent.start, {
      boardId: draggedEvent.boardId,
      columnId: draggedEvent.columnId,
      cardId: draggedEvent._id,
    });
    const filteredEvents = events?.filter((event: ICard) => event._id !== draggedEvent._id);

    if (filteredEvents) {
      setEvents([...filteredEvents, draggedEvent]);
    }
  };

  const handleSaveDeadline = async (date: Date, ids: IIds): Promise<void> => {
    updateCardItem('deadline', date, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateBoard();
        updateSnackBarMessage('deadline has been updated');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  useEffect(() => {
    if (cards) {
      setEvents(cards);
    }
  }, [cards]);

  return (
    <Container style={{ paddingTop: '1rem' }}>
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
