import { Box, Typography } from '@material-ui/core';
import { EventProps } from 'react-big-calendar';
import { CardEvent } from '../../../interface/Calender';

const Card = (props: EventProps<CardEvent>): JSX.Element => {
  const { event } = props;
  return (
    <>
      <Box
        style={{
          height: '5px',
          width: '20%',
          background: event.tagColor,
          borderRadius: '20px',
        }}
      ></Box>
      <Typography variant="h6" className="eventTitle">
        {event.title}
      </Typography>
    </>
  );
};

export default Card;
