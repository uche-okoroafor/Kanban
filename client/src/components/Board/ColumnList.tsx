import React from 'react';
import Column from './Column';
import { useBoard } from '../../context/useBoardContext';

const ColumnList = (): JSX.Element => {
  const { data } = useBoard();

  const renderedColumns = data?.columnOrder.map((el) => {
    return (
      <Column 
        key={data.columns[el].id} 
        title={data.columns[el].title} 
        columnId={data.columns[el].id} 
      />
    );
  });
  return (
    <React.Fragment>
      {renderedColumns}
    </React.Fragment>
  );
};

export default ColumnList;
