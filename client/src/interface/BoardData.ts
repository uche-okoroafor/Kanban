interface Column {
  id: string;
  title: string;
  taskIds: Array<string>;
}

interface ColumnObject {
  [key: string]: Column;
}

interface Task {
  id: string;
  title: string;
}

interface TaskObject {
  [key: string]: Task;
}

export interface BoardData {
  tasks: TaskObject;
  uniqueTaskKey: number;
  columns: ColumnObject;
  uniqueColumnKey: number;
  columnOrder: Array<string>;
}
