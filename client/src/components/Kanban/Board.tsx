import { Grid } from '@material-ui/core';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useKanban } from '../../context/useKanbanContext';
import ColumnComponent from './Column/Column';

const Board = (): JSX.Element => {
  const { columns, handleDragEnd } = useKanban();
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided: DroppableProvided) => {
          return (
            <Grid ref={provided.innerRef} container spacing={2} {...provided.droppableProps}>
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
            </Grid>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
