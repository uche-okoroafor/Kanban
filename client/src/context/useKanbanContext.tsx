import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { columnData } from '../components/Kanban/data';
import { KanbanContext } from '../interface/KanbanContext';
import { Column, IColumn } from '../interface/Column';
import { Card } from '../interface/Card';
import cloneDeep from 'lodash.clonedeep';
import { useSnackBar } from './useSnackbarContext';
import { useBoard } from './useBoardContext';
import Board from '../components/Kanban/Board';
import { moveCardWithinColumn, moveCardOutsideColumn, moveColumns } from '../helpers/APICalls/columnApiCalls';
import { createCard } from '../helpers/APICalls/cardApiCalls';
import { stringOrDate } from 'react-big-calendar';

export const KanbanContextProvider = createContext<KanbanContext>({} as KanbanContext);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  // we need to get the Id of the board, so that we can use it to manipulate the data at the backend
  const { focusedBoardId, focusedColumns, updateBoard } = useBoard();
  const [columns, setColumns] = useState<Array<Column>>(
    focusedColumns,
    // columnData,
  );
  const [focusedCard, setFocusedCard] = useState<Card | null>(null);
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    setColumns(focusedColumns);
  }, [focusedColumns]);

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    const columnsCopy: Column[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col._id === source.droppableId);

    if (type === 'column') {
      // reorder the column.
      const reorderedColumns = swapColumns(columnsCopy, source, destination);
      setColumns(reorderedColumns);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (colIndex > -1) {
        const cards = Array.from(columnsCopy[colIndex].cards);
        const columnId = columnsCopy[colIndex]._id;
        const newCards = swapCards(cards, source, destination, draggableId, columnId);
        columnsCopy[colIndex].cards = newCards;
        setColumns(columnsCopy);
        return;
      }
    }

    if (source.droppableId !== destination.droppableId) {
      const targetColumnIndex = columnsCopy.findIndex((col) => col._id === destination.droppableId);

      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const originalColumn = columnsCopy[colIndex];
        const [card] = originalColumn.cards.splice(source.index, 1);
        card.columnId = targetColumn._id;
        targetColumn.cards.splice(destination.index, 0, card);

        handleSwapCardToColumnDataBase({
          cardId: draggableId,
          initialColumnId: source.droppableId,
          targetColumnId: destination.droppableId,
          boardId: focusedBoardId,
          targetPosition: destination.index,
          card,
        });
      }
    }

    setColumns(columnsCopy);
    return;
  };

  const swapColumns = (columns: Column[], source: DraggableLocation, destination: DraggableLocation): Column[] => {
    const [sourceCol] = columns.splice(source.index, 1);
    handleSwapColumnsDataBase({
      columnId: sourceCol._id,
      boardId: focusedBoardId,
      targetPosition: destination.index,
      column: sourceCol,
    });

    columns.splice(destination.index, 0, sourceCol);
    return columns;
  };

  const swapCards = (
    cards: Card[],
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
    columnId: string,
  ): Card[] => {
    console.log(draggableId, source.index, destination.index, 'source2');

    const cardsCopy = [...cards];
    const cardIndex = cardsCopy.findIndex((card: Card) => card._id === draggableId);
    const card = cardsCopy.find((card: Card) => card._id === draggableId);
    handleSwapCardInDataBase({
      cardId: draggableId,
      targetPosition: destination.index,
      card,
      columnId,
    });

    if (cardIndex > -1) {
      const [card] = cardsCopy.splice(source.index, 1);
      cardsCopy.splice(destination.index, 0, card);
      return cardsCopy;
    }
    return cards;
  };

  const addCard = (card: Card): boolean => {
    if (card.cardTitle === '') {
      updateSnackBarMessage('Please enter a card name');
      return false;
    }
    const columnsCopy = cloneDeep(columns);

    console.log(columnsCopy, 'columnsCopy');
    const columnIndex = columnsCopy.findIndex((col) => col._id === card.columnId);
    handleCreateCard({
      boardId: String(focusedBoardId),
      columnId: card.columnId,
      cardTitle: card.cardTitle,
      tagColor: String(card.tagColor),
    });

    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      setColumns(columnsCopy);
      return true;
    }
    return false;
  };

  const setOpenCard = (card: Card): void => {
    setFocusedCard(card);
  };
  const resetOpenCard = (): void => setFocusedCard(null);

  const getColumnById = (columnId: string): Column | null => {
    if (!columnId) return null;
    const colIndex = columns.findIndex((col) => col._id === columnId);
    if (colIndex > -1) {
      return columns[colIndex];
    }
    return null;
  };

  const handleCreateCard = ({
    boardId,
    columnId,
    cardTitle,
    tagColor,
  }: {
    boardId: string;
    columnId: string;
    cardTitle: string;
    tagColor: string;
  }) => {
    createCard(boardId, columnId, cardTitle, tagColor).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Card has been added');
        console.log(data, 'success');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSwapCardInDataBase = ({
    cardId,
    card,
    targetPosition,
    columnId,
  }: {
    cardId: string;
    card: Card | undefined;
    targetPosition: number;
    columnId: string;
  }) => {
    moveCardWithinColumn({ cardId, card, columnId, boardId: focusedBoardId, targetPosition }).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoard();
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  const handleSwapCardToColumnDataBase = ({
    cardId,
    initialColumnId,
    targetColumnId,
    boardId,
    targetPosition,
    card,
  }: {
    card: Card | undefined;
    cardId: string;
    initialColumnId: string;
    targetColumnId: string;
    boardId: string | undefined;
    targetPosition: number;
  }) => {
    moveCardOutsideColumn({ cardId, initialColumnId, targetColumnId, boardId, targetPosition, card }).then((data) => {
      console.log(data);

      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoard();
        console.log(data, 'success');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  const handleSwapColumnsDataBase = ({
    columnId,
    boardId,
    targetPosition,
    column,
  }: {
    column: Column | undefined;
    columnId: string;
    boardId: string | undefined;
    targetPosition: number;
  }) => {
    moveColumns({ columnId, boardId, targetPosition, column }).then((data) => {
      console.log(data, 1010);
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoard();
        console.log(data, 'success');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <KanbanContextProvider.Provider
      value={{
        columns,
        focusedCard,
        focusedBoardId,
        handleDragEnd,
        addCard,
        setOpenCard,
        resetOpenCard,
        getColumnById,
      }}
    >
      {children}
    </KanbanContextProvider.Provider>
  );
};

export function useKanban(): KanbanContext {
  const ctx = useContext(KanbanContextProvider);
  if (!ctx) {
    throw new Error('useKanban must be used within KanbanProvider');
  }
  return ctx;
}
