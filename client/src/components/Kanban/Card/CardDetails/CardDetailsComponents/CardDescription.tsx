import { IconButton } from '@material-ui/core';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextareaAutosize } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { updateCardItem, deleteCardItem } from '../../../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../../../interface/Board';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useBoard } from '../../../../../context/useBoardContext';

interface Props {
  description: string | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardDescription({ description, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [newDescription, setNewDescription] = useState(description);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateBoard } = useBoard();

  useEffect(() => {
    if (description) {
      setNewDescription(description);
    }
  }, [description]);

  const handleSaveDescription = async (): Promise<void> => {
    updateCardItem('description', newDescription, ids).then((data) => {
      setIsSubmitting(true);
      if (data.error) {
        updateSnackBarMessage(data.error);
        setIsSubmitting(false);
      } else if (data.success) {
        setIsSubmitting(false);
        updateSnackBarMessage('Description has been updated');

        updateBoard();
      } else {
        setIsSubmitting(false);
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleDeleteDescription = async (): Promise<void> => {
    deleteCardItem('description', newDescription, ids).then((data) => {
      setIsSubmitting(true);
      if (data.error) {
        updateSnackBarMessage(data.error);
        setIsSubmitting(false);
      } else if (data.success) {
        updateBoard();
        setIsSubmitting(false);

        updateSnackBarMessage('Description has been deleted');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        setIsSubmitting(false);
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setIsSubmitting(false);
  };
  return (
    <>
      <Box className={classes.dialogContentTextContainer}>
        <DialogContentText className={classes.dialogContentText}>
          <DescriptionOutlinedIcon className={classes.textSpacing} />
          <Typography className={classes.cardItemTitle} variant="h6">
            {' '}
            Description:
          </Typography>
        </DialogContentText>
        <Box className={classes.textAreaContainer}>
          <TextareaAutosize
            value={newDescription}
            aria-label="minimum height"
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="This Card has no Description "
            className={classes.textArea}
            style={{ minHeight: '5rem', padding: '10px' }}
            disabled={disableSetting}
          />

          <Box className={classes.saveButtonContainer}>
            {' '}
            <Button
              onClick={handleSaveDescription}
              disabled={disableSetting || isSubmitting}
              variant="contained"
              size="small"
            >
              {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Save'}
            </Button>{' '}
            <IconButton
              disabled={disableSetting}
              aria-label="close"
              style={{ fontSize: '20px' }}
              color="primary"
              size="small"
              onClick={handleDeleteDescription}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
