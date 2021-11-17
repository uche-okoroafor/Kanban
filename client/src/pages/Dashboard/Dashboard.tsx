import { Box } from '@material-ui/core';
import Board from '../../components/Kanban/Board';


export default function Dashboard(): JSX.Element {
  
  return (
    <Box m={2}>
      <Board />
    </Box>
  );
}
