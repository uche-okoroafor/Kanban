import { BoardData } from '../../interface/BoardData';

const defaultData: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'task 1' },
  },
  uniqueTaskKey: 2,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Not Started',
      taskIds: [''],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-1'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Completed',
      taskIds: [''],
    },
  },
  uniqueColumnKey: 4,
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default defaultData;
