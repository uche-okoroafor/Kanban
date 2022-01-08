import { Grid, Box } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import ColumnComponent from './Column/Column';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useStyles from './useStyles';
import CreateColumnDialog from './Column/CreateColumnDialog/CreateColumnDialog';
import { useState } from 'react';
import { useBoard } from '../../context/useBoardContext';

const Board = (): JSX.Element => {
  const { columns, handleDragEnd } = useKanban();
  const [targetPosition, setTargetPosition] = useState(0);
  const { updateBoard, focusedBoardId } = useBoard();
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const height = document.getElementById('columnContainer')?.scrollHeight;

  const handleOpenDialog = (position: string) => {
    if (position === 'left') {
      setTargetPosition(0);
    } else {
      columns;
      setTargetPosition(columns.length);
    }

    setOpenDialog(true);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided: DroppableProvided) => {
          return (
            <Grid
              ref={provided.innerRef}
              style={{ height: '60vh' }}
              id="columnContainer"
              container
              spacing={2}
              {...provided.droppableProps}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => handleOpenDialog('left')}
                className={classes.addColumn}
                style={{
                  height,
                  left: 0,
                }}
              >
                <AddCircleOutlineIcon />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => handleOpenDialog('right')}
                className={classes.addColumn}
                style={{
                  height,
                  right: 0,
                }}
              >
                <AddCircleOutlineIcon />
              </Box>

              {columns.map((column, index) => (
                <>
                  <ColumnComponent
                    key={column._id}
                    index={index}
                    _id={column._id}
                    columnTitle={column.columnTitle}
                    cards={column.cards}
                    createdAt={column.createdAt}
                  />
                </>
              ))}
              {provided.placeholder}
              <CreateColumnDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                targetPosition={targetPosition}
                boardId={String(focusedBoardId)}
              />
            </Grid>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
