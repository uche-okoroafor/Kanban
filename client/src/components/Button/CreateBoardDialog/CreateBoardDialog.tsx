import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, IconButton } from '@material-ui/core';
import { createNewBoard } from '../../../helpers/APICalls/boardApiCalls';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useBoard } from '../../../context/useBoardContext';

interface Props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
}

export default function CreateBoardDialog({ openDialog, setOpenDialog }: Props): JSX.Element {
  const [creatingBoard, setCreatingBoard] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoard } = useBoard();
  const handleCreateBoard = async (): Promise<void> => {
    if (!boardTitle) {
      return;
    }
    setCreatingBoard(true);

    try {
      const { success } = await createNewBoard(boardTitle);
      if (success) {
        updateBoard();
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('Unable to create board,please try again ');
    }

    setOpenDialog(false);
    setBoardTitle('');
    setCreatingBoard(false);
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          style={{
            color: 'white',
            textAlign: 'center',
            background: '#759CFC',
            padding: '10px 5px',
            position: 'relative',
          }}
        >
          Create New Board{' '}
          <IconButton
            style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', right: '4%', top: '30%' }}
            onClick={() => setOpenDialog(false)}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Board Title"
            type="text"
            fullWidth
            variant="outlined"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', padding: '15px 5px' }}>
          <Button variant="contained" size="small" onClick={handleCreateBoard} disabled={creatingBoard}>
            {creatingBoard ? (
              <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} />
            ) : (
              'Create Board'
            )}
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
