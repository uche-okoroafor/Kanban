import CloseIcon from '@material-ui/icons/Close';
import { IBoard } from '../interface/Board';
import { IColumn } from '../interface/Column';
import { getUserBoards, updateActiveBoard } from '../helpers/APICalls/boardApiCalls';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { useKanban } from './useKanbanContext';
import { useHistory } from 'react-router-dom';
import { tempBoard } from '../components/Kanban/data';
import { useSnackBar } from './useSnackbarContext';
import { ICard } from '../interface/Calendar';
interface IBoardsContext {
  updateBoard: () => void;
  handleSelectedBoard: (selectedBoard: IBoard) => void;
  cards: Array<ICard> | undefined;
  boards: IBoard[] | undefined;
  board: IBoard;
  boardStatus: string | undefined;
  focusedBoardId: string | undefined;
  focusedColumns: Array<IColumn>;
  handleSetBoardStatus: (userBoards: Array<IBoard>) => void;
}

export const BoardContext = createContext<IBoardsContext>({
  updateBoard: () => null,
  handleSelectedBoard: () => null,
  handleSetBoardStatus: () => null,
  boards: undefined,
  cards: undefined,
  board: tempBoard,
  boardStatus: undefined,
  focusedBoardId: undefined,
  focusedColumns: tempBoard.columns,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [boards, setBoards] = useState<IBoardsContext['boards']>(undefined);
  const [board, setBoard] = useState<IBoardsContext['board']>(tempBoard);
  const [cards, setCards] = useState<IBoardsContext['cards']>(undefined);
  const [focusedBoardId, setFocusedBoardId] = useState<IBoardsContext['focusedBoardId']>(undefined);
  const [focusedColumns, setFocusedColumns] = useState<Array<IColumn>>(tempBoard.columns);
  const [boardStatus, setBoardStatus] = useState<string | undefined>(undefined);
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const updateBoard = useCallback(async () => {
    await getUserBoards()
      .then((data) => {
        const activeBoard = data.boards.find((board) => board._id === data.activeBoard);
        if (activeBoard) {
          setBoards(data.boards);
          setBoard(activeBoard);
          setFocusedBoardId(activeBoard._id);
          setFocusedColumns(activeBoard.columns);
          handleUpdateCards(activeBoard);
        } else {
          setBoards(data.boards);
          setBoard(data.boards[0]);
          setFocusedBoardId(data.boards[0]._id);
          setFocusedColumns(data.boards[0].columns);
          handleSetActiveBoard(data.boards[0]._id);
          handleUpdateCards(data.boards[0]);
        }
        handleSetBoardStatus(data.boards);
      })
      .catch((error) => {
        handleSetBoardStatus([]);

        return console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetBoardStatus = (userBoards: Array<IBoard>) => {
    if (userBoards.length) {
      setBoardStatus('non-empty');
    } else {
      setBoardStatus('empty');
    }
  };

  const handleSetActiveBoard = (boardId: string) => {
    updateActiveBoard(boardId).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateSnackBarMessage('updated');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
      }
    });
  };
  const handleSelectedBoard = (selectedBoard: IBoard): void => {
    setBoard(selectedBoard);
    setFocusedBoardId(selectedBoard._id);
    setFocusedColumns(selectedBoard.columns);
    handleSetActiveBoard(selectedBoard._id);
    history.push('/dashboard');
  };

  const handleUpdateCards = (selectedBoard: IBoard): void => {
    let allCards: Array<ICard> = [];
    for (const column of selectedBoard.columns) {
      for (const card of column.cards) {
        const calenderCard: ICard = {
          _id: card._id,
          start: new Date(String(card.deadline)),
          end: new Date(String(card.deadline)),
          title: card.cardTitle,
          tagColor: card.tagColor,
          boardId: selectedBoard._id,
          columnId: column._id,
        };
        allCards = [...allCards, calenderCard];
      }
    }
    setCards(allCards);
  };

  useEffect(() => {
    updateBoard();
    if (loggedInUser === undefined) setBoardStatus(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  return (
    <BoardContext.Provider
      value={{
        updateBoard,
        cards,
        boards,
        board,
        handleSelectedBoard,
        focusedBoardId,
        focusedColumns,
        boardStatus,
        handleSetBoardStatus,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardsContext {
  return useContext(BoardContext);
}
