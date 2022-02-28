import { Grid, Box, IconButton, Typography, Paper } from '@material-ui/core';
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
  // const height = document.getElementById('columnContainer')?.scrollHeight;

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
              style={{ display: 'flex', justifyContent: 'center' }}
              id="columnContainer"
              // container
              // spacing={2}
              {...provided.droppableProps}
            >
              <Box
                onClick={() => handleOpenDialog('left')}
                className={classes.addColumn}
                style={{
                  height: '70vh',
                  left: 0,
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                  zIndex: 2,
                }}
              >
                <AddCircleOutlineIcon />
              </Box>
              <Box
                onClick={() => handleOpenDialog('right')}
                className={classes.addColumn}
                style={{
                  height: '70vh',
                  right: 0,
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  zIndex: 2,
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
                <Box style={{ marginTop: '12%', height: '40vh', width: '100%' }}>
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
