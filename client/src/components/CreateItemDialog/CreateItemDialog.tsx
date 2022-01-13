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
import { addColumn } from '../../helpers/APICalls/columnApiCalls';
import { addBoard } from '../../helpers/APICalls/boardApiCalls';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useBoard } from '../../context/useBoardContext';
import { ICardResponse } from '../../interface/Board';

interface Props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
  targetPosition: number | undefined;
  boardId: string | undefined;
  item: string;
}

export default function CreateItemDialog({
  openDialog,
  setOpenDialog,
  targetPosition,
  boardId,
  item,
}: Props): JSX.Element {
  const [creatingItem, setCreatingItem] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoard } = useBoard();

  const handleCreateItem = () => {
    if (!itemTitle) {
      return;
    }
    switch (item) {
      case 'column':
        return addColumn({ boardId, columnTitle: itemTitle, targetPosition }).then((data) => handleResponse(data));
      case 'board':
        return addBoard(itemTitle).then((data) => handleResponse(data));
      default:
        break;
    }
  };

  const handleResponse = (data: ICardResponse) => {
    setCreatingItem(true);
    if (data.error) {
      setCreatingItem(false);
      updateSnackBarMessage(data.error.message);
    } else if (data.success) {
      updateBoard();
      updateSnackBarMessage(`"${itemTitle}" ${item} has been created`);
      setCreatingItem(false);
      setOpenDialog(false);
    } else {
      // should not get here from backend but this catch is for an unknown issue
      console.error({ data });
      setCreatingItem(false);
      updateSnackBarMessage('An unexpected error occurred. Please try again');
    }
    setItemTitle('');
    setCreatingItem(false);
    setOpenDialog(false);
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
          {` Add New ${item}`}{' '}
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
            label={`Add ${item} Title`}
            type="text"
            fullWidth
            variant="outlined"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', padding: '15px 5px' }}>
          <Button variant="contained" size="small" onClick={handleCreateItem} disabled={creatingItem}>
            {creatingItem ? (
              <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} />
            ) : (
              `Save ${item}`
            )}
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
