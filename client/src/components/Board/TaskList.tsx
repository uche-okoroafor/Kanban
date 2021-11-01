import React from 'react';
import Task from './Task';
import { useBoard } from '../../context/useBoardContext';

interface IProps {
  columnId: string;
}

const TaskList = ({ columnId }: IProps): JSX.Element => {
  const { data } = useBoard();

  const renderedTasks = data?.columns[columnId].taskIds.map((taskId) => {
    return (
      <Task
        key={data.tasks[taskId].id}
        title={data.tasks[taskId].title}
        columnId={columnId}
        taskId={data.tasks[taskId].id}
      />
    );
  });

  return <React.Fragment>{renderedTasks}</React.Fragment>;
};

export default TaskList;
