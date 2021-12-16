import CloseIcon from '@material-ui/icons/Close';
import { IBoard } from '../interface/Board';
import { IColumn } from '../interface/Column';
import { getUserBoards } from '../helpers/APICalls/boardApiCalls';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { useKanban } from './useKanbanContext';
import { tempBoard } from '../components/Kanban/data';
interface IBoardsContext {
  updateBoard: () => void;
  handleSelectedBoard: (selectedBoard: IBoard) => void;
  boards: IBoard[] | undefined;
  board: IBoard;
  focusedBoardId: string | undefined;
  focusedColumns: Array<IColumn>;
}

export const BoardContext = createContext<IBoardsContext>({
  updateBoard: () => null,
  handleSelectedBoard: () => null,
  boards: undefined,
  board: tempBoard,
  focusedBoardId: undefined,
  focusedColumns: tempBoard.columns,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [boards, setBoards] = useState<IBoardsContext['boards']>(undefined);
  const [board, setBoard] = useState<IBoardsContext['board']>(tempBoard);
  const [focusedBoardId, setFocusedBoardId] = useState<IBoardsContext['focusedBoardId']>(undefined);
  const [focusedColumns, setFocusedColumns] = useState<Array<IColumn>>(tempBoard.columns);
  const { loggedInUser } = useAuth();
  const updateBoard = useCallback(async () => {
    await getUserBoards()
      .then((data) => {
        setBoards(data.boards);
        setBoard(data.boards[0]);
        setFocusedBoardId(data.boards[0]._id);
        setFocusedColumns(data.boards[0].columns);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelectedBoard = (selectedBoard: IBoard): void => {
    setBoard(selectedBoard);
    setFocusedBoardId(selectedBoard._id);
    setFocusedColumns(selectedBoard.columns);
  };

  useEffect(() => {
    updateBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  return (
    <BoardContext.Provider
      value={{
        updateBoard,
        boards,
        board,
        handleSelectedBoard,
        focusedBoardId,
        focusedColumns,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardsContext {
  return useContext(BoardContext);
}
