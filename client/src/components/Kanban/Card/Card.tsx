import { Box, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';
import { useKanban } from '../../../context/useKanbanContext';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';
import CardDetails from './CardDetails/CardDetails';
import { useState } from 'react';
import { IIds } from '../../../interface/Board';
import { ICard } from '../../../interface/Card';
type CardProps = {
  columnId: string;
  index: number;
  card: ICard;
};
const Card = ({ columnId, index, card }: CardProps): JSX.Element => {
  const { setOpenCard, focusedCard, focusedBoardId } = useKanban();
  const [openDialog, setOpenDialog] = useState(false);
  const [ids, setIds] = useState<IIds>({ cardId: '', columnId: '', boardId: '' });
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tagColor: card.tagColor || 'white' });

  const openCardDetails = (): void => {
    setOpenCard({
      _id: card._id,
      cardTitle: card?.cardTitle,
      tagColor: card.tagColor,
      deadline: card.deadline,
      description: card.description,
      comment: card.comment,
      columnId,
    });
    setIds({
      cardId: card._id,
      columnId,
      boardId: focusedBoardId,
    });
    setOpenDialog(true);
  };

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
              <Paper
                onClick={() => openCardDetails()}
                elevation={3}
                className={clsx(classes.card, snapshot.isDragging && classes.cardDragging)}
              >
                <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
                <Typography className={classes.typography} variant="h6">
                  {card.cardTitle}
                </Typography>
              </Paper>
            </div>
          );
        }}
      </Draggable>
      <CardDetails openDialog={openDialog} setOpenDialog={setOpenDialog} ids={ids} displayedCard={focusedCard} />
    </>
  );
};

export default Card;
