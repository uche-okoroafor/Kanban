import { Box } from '@material-ui/core';
import Board from '../../components/Kanban/Board';
import { useState } from 'react';

export default function Dashboard(): JSX.Element {
  const [file, setFile] = useState<{ [prop: string]: string | number } | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };
  return (
    <Box m={2}>
      <Board />
    </Box>
  );
}
