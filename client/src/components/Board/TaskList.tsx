  import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import Task from './Task';
import { useBoard } from '../../context/useBoardContext';

interface IProps {
  provided: any;
  innerRef: any;
  columnId: string;
  children: any;
}

const TaskList = ({ provided, innerRef, columnId, children }: IProps): JSX.Element => {
  const { data } = useBoard();

  const renderedTasks = data?.columns[columnId].taskIds.map((taskId, idx) => {
    return (
      <div 
        {...provided.droppableProps} 
        ref={innerRef} 
        key={data.tasks[taskId].id}
      >
        {children}
        <Draggable draggableId={taskId} index={idx}>
          {(provided) => (
            <Task
              title={data.tasks[taskId].title}
              columnId={columnId}
              taskId={data.tasks[taskId].id}
              provided={provided}
              innerRef={provided.innerRef}
            />
          )}
        </Draggable>
        {provided.placeholder}
      </div>
    );
  });

  return <React.Fragment>{renderedTasks}</React.Fragment>;
};

export default TaskList;
