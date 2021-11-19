import { useEffect, useState } from 'react';
import getUser from '../helpers/APICalls/user';
import { Column } from '../interface/Column';

interface UseBoardParam {
  userId: string | undefined;
  boardName: string;
}

interface UseBoard {
  cols: Array<Column> | null | undefined;
  setCols: (newCols: Array<Column> | null | undefined) => void;
}

const useBoard = ({ userId, boardName }: UseBoardParam): UseBoard => {
  const [cols, setColumns] = useState<Array<Column> | null | undefined>(null);

  useEffect(() => {
    getUser(userId).then((res) => {
      const boards = res.boards;
      const boardsCols = boards?.find(({ boardTitle }) => boardTitle === boardName);
      setColumns(boardsCols?.columns);
    });
  }, [boardName, userId, setColumns]);

  const setCols = (newCols: Array<Column> | null | undefined): void => {
    setColumns(newCols);
  };

  return {
    cols,
    setCols,
  };
};

export { useBoard };
