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
import { createColumn } from '../../../../helpers/APICalls/columnApiCalls';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { useSnackBar } from '../../../../context/useSnackbarContext';
import { useBoard } from '../../../../context/useBoardContext';

interface Props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
  targetPosition: number;
  boardId: string;
}

export default function CreateColumnDialog({ openDialog, setOpenDialog, targetPosition, boardId }: Props): JSX.Element {
  const [creatingColumn, setCreatingColumn] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoard } = useBoard();
  const handleCreateColumn = async (): Promise<void> => {
    if (!columnTitle) {
      return;
    }
    setCreatingColumn(true);

    try {
      const { success } = await createColumn({ columnTitle, boardId, targetPosition });
      if (success) {
        updateBoard();
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('Unable to create column,please try again ');
    }

    setOpenDialog(false);
    setColumnTitle('');
    setCreatingColumn(false);
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
          Add New Column{' '}
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
            label="Add Column Title"
            type="text"
            fullWidth
            variant="outlined"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', padding: '15px 5px' }}>
          <Button variant="contained" size="small" onClick={handleCreateColumn} disabled={creatingColumn}>
            {creatingColumn ? (
              <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} />
            ) : (
              'Add Column'
            )}
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
