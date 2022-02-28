import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from '../../../interface/Card';
import { Column } from '../../../interface/Column';
import CardComponent from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../../DeleteDialog/DeleteDialog';
import { useState, useCallback } from 'react';
import { useBoard } from '../../../context/useBoardContext';

type ColumnProps = Column & { index: number };
const ColumnComponent = ({ _id, columnTitle, cards, index }: ColumnProps): JSX.Element => {
  const classes = useStyles();
  const { focusedBoardId } = useBoard();
  const [openDialog, setOpenDialog] = useState(false);
  const ItemsIds = {
    boardId: focusedBoardId,
    columnId: _id,
    cardId: undefined,
  };
  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, [setOpenDialog]);

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => {
        return (
          <Grid
            // xs={12}
            // md={6}
            // lg="auto"
            // item
            className={classes.columnGridItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Box className={classes.columnWrapper} {...provided.dragHandleProps}>
              <Box className={classes.typographyWrapper}>
                <Typography className={classes.typography} variant="h5">
                  {columnTitle}
                </Typography>
                <IconButton
                  onClick={handleOpenDialog}
                  style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', right: '4%', top: '10%' }}
                >
                  {' '}
                  <DeleteIcon style={{ color: '#E83A30' }} />
                </IconButton>
              </Box>
              <Droppable droppableId={_id} type="card">
                {(provided) => {
                  return (
                    <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                      {cards.map((card: Card, index: number) => {
                        return <CardComponent key={card._id} columnId={_id} card={card} index={index} />;
                      })}
                      {provided.placeholder}
                      <CardForm columnId={_id} />
                      <DeleteDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        item={'column'}
                        title={columnTitle}
                        ItemsIds={ItemsIds}
                      />
                    </Grid>
                  );
                }}
              </Droppable>
            </Box>
          </Grid>
        );
      }}
    </Draggable>
  );
};

export default ColumnComponent;
