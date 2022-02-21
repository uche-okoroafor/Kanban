import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { saveCheckListItem } from '../../helpers/APICalls/plugin';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  displayChecklist: boolean;
}

export default function ChecklistPlugin({ displayChecklist }: Props): JSX.Element {
  const [openChecklistForm, setChecklistForm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checklistItem, setChecklistItem] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const closeChecklistForm = () => {
    setChecklistForm(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setIsSubmitting(true);
    e.preventDefault();

    saveCheckListItem(checklistItem).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        // update card
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setIsSubmitting(false);
    setChecklistForm(false);
  };

  useEffect(() => {
    if (displayChecklist) {
      setChecklistForm(displayChecklist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayChecklist]);

  return (
    <Dialog open={openChecklistForm} onClose={closeChecklistForm}>
      <DialogTitle>Add Item</DialogTitle>{' '}
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {' '}
          <DialogContentText>
            <Stack direction="row" spacing={2}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Checklist"
                type="checklist"
                fullWidth
                variant="standard"
                onChange={(e) => setChecklistItem(e.target.value)}
              />
              <Checkbox checked={isChecked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />{' '}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={closeChecklistForm}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={isSubmitting}
            type="submit"
            onClick={closeChecklistForm}
          >
            {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Save'}
          </Button>
        </DialogActions>{' '}
      </form>
    </Dialog>
  );
}
