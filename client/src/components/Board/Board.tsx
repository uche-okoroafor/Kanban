import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ColumnList from './ColumnList';
import { useBoard } from '../../context/useBoardContext';

const Board = (): JSX.Element => {
  const { onColumnPrependClick, onColumnAppendClick } = useBoard();
  return (
    <div>      
      <CssBaseline>
        <Grid container spacing={5} justify="center">
          <Grid item md={1}>
            <IconButton aria-label="add column" onClick={() => onColumnPrependClick()}>
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item md={10}>
            <Grid container spacing={1} justify="center">
              <ColumnList />
            </Grid>
          </Grid>
          <Grid item md={1}>
            <IconButton aria-label="add column" onClick={() => onColumnAppendClick()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};

export default Board;
