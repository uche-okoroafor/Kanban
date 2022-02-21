import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import { useState } from 'react';
import NavAppBar from '../../components/Appbar/NavAppBar';
import CreateItemDialog from '../../components/CreateItemDialog/CreateItemDialog';
import Board from '../../components/Kanban/Board';
import { useBoard } from '../../context/useBoardContext';

export default function Dashboard(): JSX.Element {
  const { boardStatus } = useBoard();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Box m={2}>
      {boardStatus === undefined ? (
        <Box style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress style={{ color: 'white' }} />
        </Box>
      ) : boardStatus === 'empty' ? (
        <Box style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>
            You don&apos;t have any Board &nbsp;
            <Button
              disableElevation
              variant="contained"
              color="primary"
              size="large"
              endIcon={<AddOutlined />}
              onClick={() => setOpenDialog(true)}
            >
              Add board
            </Button>
          </Typography>
        </Box>
      ) : (
        <Board />
      )}
      <CreateItemDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        targetPosition={undefined}
        boardId={undefined}
        item={'board'}
      />
    </Box>
  );
}
