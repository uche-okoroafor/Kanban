import CloseIcon from '@material-ui/icons/Close';
import { IBoard } from '../interface/Board';
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
}

export const BoardContext = createContext<IBoardsContext>({
  updateBoard: () => null,
  handleSelectedBoard: () => null,
  boards: undefined,
  board: tempBoard,
  focusedBoardId: undefined,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [boards, setBoards] = useState<IBoardsContext['boards']>(undefined);
  const [board, setBoard] = useState<IBoardsContext['board']>(tempBoard);
  const [focusedBoardId, setFocusedBoardId] = useState<IBoardsContext['focusedBoardId']>(undefined);
  const { loggedInUser } = useAuth();
  const { updateColumns } = useKanban();
  const updateBoard = useCallback(async () => {
    await getUserBoards()
      .then((data) => {
        setBoards(data.boards);
        setFocusedBoardId(data.boards[0]._id);
        // updateColumns(data.boards[0].columns);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelectedBoard = (selectedBoard: IBoard): void => {
    setBoard(selectedBoard);
    setFocusedBoardId(selectedBoard._id);
    // updateColumns(selectedBoard.columns);
    console.log(selectedBoard);
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardsContext {
  return useContext(BoardContext);
}
