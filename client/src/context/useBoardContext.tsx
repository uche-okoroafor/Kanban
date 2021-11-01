import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { BoardData } from '../interface/BoardData';
import defaultData from '../components/Board/defaultData';

interface IBoardContext {
  data: BoardData | null | undefined;
  onColumnDeleteClick: (columnId: string) => void;
  onTaskAddClick: (columnId: string) => void;
  onTaskDeleteClick: (columnId: string, taskId: string) => void;
  onColumnPrependClick: () => void;
  onColumnAppendClick: () => void;
}

export const BoardContext = createContext<IBoardContext>({
  data: defaultData,
  onColumnDeleteClick: () => null,
  onTaskAddClick: () => null,
  onTaskDeleteClick: () => null,
  onColumnPrependClick: () => null,
  onColumnAppendClick: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [localState, setLocalState] = useState<BoardData>();

  useEffect(() => {
    setLocalState(defaultData);
  }, []);

  const onColumnPrependClick = () => {
    if (!localState) return;
    const newColumnId: number = localState.uniqueColumnKey;
    localState.uniqueColumnKey = newColumnId + 1;
    localState.columns[`column-${newColumnId}`] = {
      id: `column-${newColumnId}`,
      title: `Kanban Column ${newColumnId}`,
      taskIds: [''],
    };
    localState.columnOrder = [`column-${newColumnId}`].concat(localState.columnOrder);
    setLocalState({ ...localState, uniqueColumnKey: localState.uniqueColumnKey });
    setLocalState({ ...localState, columnOrder: localState.columnOrder });
    setLocalState({ ...localState, columns: localState.columns });
  };

  const onColumnAppendClick = () => {
    if (!localState) return;
    const newColumnId: number = localState.uniqueColumnKey;
    localState.uniqueColumnKey = newColumnId + 1;
    localState.columns[`column-${newColumnId}`] = {
      id: `column-${newColumnId}`,
      title: `Kanban Column ${newColumnId}`,
      taskIds: [''],
    };
    localState.columnOrder = localState.columnOrder.concat([`column-${newColumnId}`]);
    setLocalState({ ...localState, uniqueColumnKey: localState.uniqueColumnKey });
    setLocalState({ ...localState, columnOrder: localState.columnOrder });
    setLocalState({ ...localState, columns: localState.columns });
  };

  const onColumnDeleteClick = (columnId: string) => {
    if (!localState) return;
    if (localState.columns[columnId].taskIds.length) {
      localState.columns[columnId].taskIds.forEach((e) => {
        delete localState.tasks[e];
      });
    }
    const idx: number = localState.columnOrder.findIndex((e) => e === columnId);
    localState.columnOrder.splice(idx, 1);
    delete localState.columns[columnId];
    setLocalState({ ...localState, tasks: localState.tasks });
    setLocalState({ ...localState, columnOrder: localState.columnOrder });
    setLocalState({ ...localState, columns: localState.columns });
  };

  const onTaskDeleteClick = (columnId: string, taskId: string) => {
    if (!localState) return;
    delete localState.tasks[taskId];
    const idx: number = localState.columns[columnId].taskIds.findIndex((el) => el === taskId);
    localState.columns[columnId].taskIds.splice(idx, 1);
    setLocalState({ ...localState, tasks: localState.tasks });
    setLocalState({ ...localState, columns: localState.columns });
  };

  const onTaskAddClick = (columnId: string) => {
    if (!localState) return;
    if (localState.columns[columnId].taskIds[0] === '') {
      const uniqueKey: number = localState.uniqueTaskKey;
      const newTask = `task-${uniqueKey}`;
      localState.columns[columnId] = {
        id: columnId,
        title: localState.columns[columnId].title,
        taskIds: [newTask],
      };
      localState.tasks[newTask] = { id: newTask, title: `task ${uniqueKey}` };
      localState.uniqueTaskKey = uniqueKey + 1;
    } else {
      const uniqueKey = localState.uniqueTaskKey;
      const newTask = `task-${uniqueKey}`;
      localState.columns[columnId] = {
        id: columnId,
        title: localState.columns[columnId].title,
        taskIds: localState.columns[columnId].taskIds.concat([newTask]),
      };
      localState.tasks[newTask] = { id: newTask, title: `task ${uniqueKey}` };
      localState.uniqueTaskKey = uniqueKey + 1;
    }
    setLocalState({ ...localState, columns: localState.columns });
    setLocalState({ ...localState, tasks: localState.tasks });
    setLocalState({ ...localState, uniqueTaskKey: localState.uniqueTaskKey });
  };

  return (
    <BoardContext.Provider
      value={{
        data: localState,
        onColumnDeleteClick,
        onTaskAddClick,
        onTaskDeleteClick,
        onColumnPrependClick,
        onColumnAppendClick,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
