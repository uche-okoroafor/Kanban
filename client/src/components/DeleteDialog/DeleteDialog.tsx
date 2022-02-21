import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { CircularProgress } from '@mui/material';
import { deleteColumn } from '../../helpers/APICalls/columnApiCalls';
import { deleteCard } from '../../helpers/APICalls/cardApiCalls';
import { deleteBoard } from '../../helpers/APICalls/boardApiCalls';
import { ICardResponse, IIds } from '../../interface/Board';
import { useBoard } from '../../context/useBoardContext';

interface Props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
  item: string;
  title: string;
  ItemsIds: IIds;
}

export default function ResponsiveDialog({ openDialog, setOpenDialog, item, title, ItemsIds }: Props): JSX.Element {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isDeleting, setDeleting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoard } = useBoard();
  const handleDeleteItem = () => {
    switch (item) {
      case 'card':
        return deleteCard({ columnId: ItemsIds.columnId, boardId: ItemsIds.boardId, cardId: ItemsIds.cardId }).then(
          (data) => handleResponse(data),
        );
      case 'column':
        return deleteColumn({ columnId: ItemsIds.columnId, boardId: ItemsIds.boardId }).then((data) =>
          handleResponse(data),
        );
      case 'board':
        return deleteBoard({ boardId: ItemsIds.boardId }).then((data) => handleResponse(data));
      default:
        break;
    }
  };

  const handleResponse = (data: ICardResponse) => {
    setDeleting(true);
    if (data.error) {
      setDeleting(false);
      updateSnackBarMessage(data.error);
    } else if (data.success) {
      updateBoard();
      updateSnackBarMessage(`"${title}" ${item} has been deleted`);
      setDeleting(false);
      setOpenDialog(false);
    } else {
      // should not get here from backend but this catch is for an unknown issue
      console.error({ data });
      setDeleting(false);
      updateSnackBarMessage('An unexpected error occurred. Please try again');
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText align="center">{`You are about to delete "${title}" ${item}`}</DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            autoFocus
            color="primary"
            variant="contained"
            style={{ background: '#1A545C' }}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteItem}
            disabled={isDeleting}
            style={{ background: '#1A545C' }}
            variant="contained"
            autoFocus
          >
            {isDeleting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
