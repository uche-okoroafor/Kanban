import CloseIcon from '@material-ui/icons/Close';
import { IBoard } from '../interface/Board';
import { IColumn } from '../interface/Column';
import { getUserBoards, updateActiveBoard } from '../helpers/APICalls/boardApiCalls';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { useKanban } from './useKanbanContext';
import { tempBoard } from '../components/Kanban/data';
import { useSnackBar } from './useSnackbarContext';
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
  const { updateSnackBarMessage } = useSnackBar();

  const updateBoard = useCallback(async () => {
    await getUserBoards()
      .then((data) => {
        if (loggedInUser?.activeBoard) {
          const activeBoard = data.boards.find((board) => board._id === loggedInUser?.activeBoard);

          if (activeBoard) {
            console.log('gere');
            setBoards(data.boards);
            setBoard(activeBoard);
            setFocusedBoardId(activeBoard._id);
            setFocusedColumns(activeBoard.columns);
          }
        } else {
          setBoards(data.boards);
          setBoard(data.boards[0]);
          setFocusedBoardId(data.boards[0]._id);
          setFocusedColumns(data.boards[0].columns);
          handleSetActiveBoard(data.boards[0]._id);
        }
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetActiveBoard = (boardId: string) => {
    updateActiveBoard(boardId).then((data) => {
      console.log(data, 'data');
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        // updateBoard();
        updateSnackBarMessage('updated');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        // console.error({ data });
        // updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSelectedBoard = (selectedBoard: IBoard): void => {
    setBoard(selectedBoard);
    setFocusedBoardId(selectedBoard._id);
    setFocusedColumns(selectedBoard.columns);
    handleSetActiveBoard(selectedBoard._id);
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
