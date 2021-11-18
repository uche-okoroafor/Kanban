import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Draggable } from 'react-beautiful-dnd';
import { useKanban } from '../../../context/useKanbanContext';
import useColorTagStyles from '../shared/colorStyles';
import useStyles from './useStyles';
import CardDetails from './CardDetails/CardDetails';
import { useState } from 'react';

type CardProps = {
  id: string;
  name: string;
  columnId: string;
  index: number;
  tag: string;
};
const Card = ({ id, name, tag = 'white', columnId, index }: CardProps): JSX.Element => {
  const { setOpenCard, focusedCard, focusedBoardId } = useKanban();
  const [openDialog, setOpenDialog] = useState(false);
  const [ids, setIds] = useState({ cardId: '', columnId: '', boardId: '' });
  const classes = useStyles();
  const colorClasses = useColorTagStyles({ tag });

  const openCardDetails = (id: string, name: string, tag: string, columnId: string): void => {
    setOpenCard({
      id,
      name,
      tag,
      columnId,
    });
    setIds({
      cardId: id,
      columnId,
      boardId: focusedBoardId,
    });
    setOpenDialog(true);
    console.log(focusedCard);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
              <Box
                onClick={() => openCardDetails(id, name, tag, columnId)}
                className={clsx(classes.card, snapshot.isDragging && classes.cardDragging)}
              >
                <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
                <Typography className={classes.typography} variant="h6">
                  {name}
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
