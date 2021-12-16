import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';
import { useKanban } from '../../../context/useKanbanContext';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';
import CardDetails from './CardDetails/CardDetails';
import { useState } from 'react';
import { IIds } from '../../../interface/Board';

type CardProps = {
  cardId: string;
  cardTitle: string;
  columnId: string;
  index: number;
  tag: string;
};
const Card = ({ cardId, cardTitle, tag = 'white', columnId, index }: CardProps): JSX.Element => {
  const { setOpenCard, focusedCard, focusedBoardId } = useKanban();
  const [openDialog, setOpenDialog] = useState(false);
  const [ids, setIds] = useState<IIds>({ cardId: '', columnId: '', boardId: '' });
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag });

  const openCardDetails = (_id: string, name: string, tag: string, columnId: string): void => {
    setOpenCard({
      _id,
      cardTitle: name,
      tag,
      columnId,
    });
    setIds({
      cardId,
      columnId,
      boardId: focusedBoardId,
    });
    setOpenDialog(true);
    console.log(focusedCard);
  };

  return (
    <>
      <Draggable draggableId={cardId} index={index}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
              <Box
                onClick={() => openCardDetails(cardId, cardTitle, tag, columnId)}
                className={clsx(classes.card, snapshot.isDragging && classes.cardDragging)}
              >
                <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
                <Typography className={classes.typography} variant="h6">
                  {cardTitle}
                </Typography>
              </Box>
            </div>
          );
        }}
      </Draggable>
      <CardDetails openDialog={openDialog} setOpenDialog={setOpenDialog} ids={ids} displayedCard={focusedCard} />
    </>
  );
};

export default Card;
