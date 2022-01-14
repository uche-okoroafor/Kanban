import { Grid, Box, IconButton, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import ColumnComponent from './Column/Column';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useStyles from './useStyles';
import CreateColumnDialog from '../CreateItemDialog/CreateItemDialog';
import { useState } from 'react';
import { useBoard } from '../../context/useBoardContext';

const Board = (): JSX.Element => {
  const { columns, handleDragEnd } = useKanban();
  const [targetPosition, setTargetPosition] = useState(0);
  const { focusedBoardId } = useBoard();
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

              {columns.length > 0 ? (
                columns.map((column, index) => (
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
                ))
              ) : (
                <Box style={{ marginTop: '15%', height: '100%', width: '100%' }}>
                  <Typography align="center" variant="h5">
                    Add a Column{' '}
                    <IconButton onClick={() => handleOpenDialog('right')}>
                      {' '}
                      <AddCircleOutlineIcon />
                    </IconButton>{' '}
                  </Typography>
                </Box>
              )}

              {provided.placeholder}
              <CreateColumnDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                targetPosition={targetPosition}
                boardId={String(focusedBoardId)}
                item={'column'}
              />
            </Grid>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
