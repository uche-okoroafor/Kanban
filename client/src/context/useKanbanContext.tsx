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

export const KanbanContextProvider = createContext<KanbanContext>({} as KanbanContext);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  // we need to get the Id of the board, so that we can use it to manipulate the data at the backend
  const { focusedBoardId, focusedColumns } = useBoard();
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
        const newCards = swapCards(cards, source, destination, draggableId);
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
      }
    }

    setColumns(columnsCopy);
    return;
  };

  const swapColumns = (columns: Column[], source: DraggableLocation, destination: DraggableLocation): Column[] => {
    const [sourceCol] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, sourceCol);
    return columns;
  };

  const swapCards = (
    cards: Card[],
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
  ): Card[] => {
    const cardsCopy = [...cards];
    const cardIndex = cardsCopy.findIndex((card: Card) => card._id === draggableId);
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
    const columnIndex = columnsCopy.findIndex((col) => col._id === card.columnId);
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
