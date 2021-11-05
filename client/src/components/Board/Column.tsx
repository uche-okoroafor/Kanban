import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import { useBoard } from '../../context/useBoardContext';

interface IProps {
  title: string;
  columnId: string;
}

const Column = ({ title, columnId }: IProps): JSX.Element => {
  const { data, onColumnDeleteClick, onTaskAddClick } = useBoard();

  const onDragEnd = (result: any, provided: any) => {
    const { destination, source, draggableId, type } = result;
  
    //if(!destination) return;
    //if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    const beg = data ? console.log(data.columns[source.droppableId]) : console.log('null');
    const end = data ? console.log(destination): console.log('null');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid item md={3}>
        <Card>
          <CardHeader
            title={title}
            action={
              <IconButton aria-label="delete" onClick={() => onColumnDeleteClick(columnId)}>
                <RemoveCircleIcon />
              </IconButton>
            }
          />
          {data ? data.columns[columnId].taskIds[0] ? 
            <Droppable
              droppableId={columnId}
              type="task"
            >
              {provided => (  
                <TaskList
                  provided={provided} 
                  innerRef={provided.innerRef}
                  columnId={columnId}
                >
                </TaskList>
              )}
            </Droppable> 
          : null : null}
          <CardContent>
            <IconButton aria-label="add task" onClick={() => onTaskAddClick(columnId)}>
              <AddCircleIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    </DragDropContext>    
  );
};

export default Column;
