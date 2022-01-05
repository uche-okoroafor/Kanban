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
        tagColor: 'green',
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
        deadline: new Date(),
        tagColor: 'red',
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
        tagColor: 'red',
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
        tagColor: 'yellow',
        // other data (assignees, due dates, etc.)
      },
      {
        _id: 'car-5',
        columnId: 'col-4',
        cardTitle: 'Practice exam',
        tagColor: 'red',
      },
      {
        _id: 'car-6',
        columnId: 'col-4',
        cardTitle: 'Research',
        tagColor: 'green',
      },
    ],
  },
];
export const tempBoard = {
  boardTitle: 'tempBoard',
  _id: '1',
  columns: columnData,
};
