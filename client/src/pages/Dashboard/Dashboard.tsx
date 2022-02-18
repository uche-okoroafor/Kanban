import { Box } from '@material-ui/core';
import { useState } from 'react';
import NavAppBar from '../../components/Appbar/NavAppBar';
import Board from '../../components/Kanban/Board';

export default function Dashboard(): JSX.Element {
  return (
    <Box m={2}>
      <Board />
    </Box>
  );
}
