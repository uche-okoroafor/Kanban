import { Box, Typography } from '@material-ui/core';
import { EventProps, HeaderProps, DateHeaderProps } from 'react-big-calendar';
import { ICard } from '../../../interface/Calender';

export const CardContainer = ({ event }: EventProps<ICard>): JSX.Element => {
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

export const DayHeader = ({ isOffRange, label }: DateHeaderProps): JSX.Element => {
  return (
    <>
      {!isOffRange && (
        <Typography
          style={{
            padding: '7px 5px',
            color: ' #899ad7',
            fontWeight: 600,
          }}
          align="left"
        >
          {label[0] === '0' ? label[1] : label}
        </Typography>
      )}
    </>
  );
};

export const MonthHeader = ({ label }: HeaderProps): JSX.Element => {
  return (
    <>
      <Typography
        style={{
          padding: '7px 5px',
          color: ' #899ad7',
          fontWeight: 600,
        }}
      >
        {label.slice(0, 3)}
      </Typography>
    </>
  );
};
