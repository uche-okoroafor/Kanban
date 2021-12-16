import { Column } from '../../interface/Column';

export const columnData: Column[] = [
  {
    _id: 'col-1',
    columnTitle: 'Philosophy',
    createdAt: new Date(),
    cards: [
      {
        _id: 'car-1',
        columnId: 'col-1',
        cardTitle: 'Essay on the environment',
        tag: 'green',
      },
    ],
  },
  {
    _id: 'col-2',
    columnTitle: 'Math',
    createdAt: new Date(),
    cards: [
      {
        _id: 'car-2',
        columnId: 'col-2',
        cardTitle: 'Midterm exam',
        dueDate: new Date(),
        tag: 'red',
      },
    ],
  },
  {
    _id: 'col-3',
    columnTitle: 'In Progress',
    createdAt: new Date(),
    cards: [
      {
        _id: 'car-3',
        columnId: 'col-3',
        cardTitle: 'Homework',
        tag: 'red',
        // other data (assignees, due dates, etc.)
      },
    ],
  },
  {
    _id: 'col-4',
    columnTitle: 'Done',
    createdAt: new Date(),
    cards: [
      {
        _id: 'car-4',
        columnId: 'col-4',
        cardTitle: 'Workshop',
        tag: 'yellow',
        // other data (assignees, due dates, etc.)
      },
      {
        _id: 'car-5',
        columnId: 'col-4',
        cardTitle: 'Practice exam',
        tag: 'red',
      },
      {
        _id: 'car-6',
        columnId: 'col-4',
        cardTitle: 'Research',
        tag: 'green',
      },
    ],
  },
];
export const tempBoard = {
  boardTitle: 'tempBoard',
  _id: '1',
  columns: columnData,
};
