import { IconButton } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box, Typography, TextareaAutosize, CircularProgress } from '@material-ui/core';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { saveCardItem, deleteCardItem } from '../../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../../interface/Boards';
import { useSnackBar } from '../../../../context/useSnackbarContext';
import { useBoard } from '../../../../context/useBoardContext';

interface Props {
  comment: string | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardComment({ comment, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [newComment, setNewComment] = useState(comment);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateBoards, boards } = useBoard();

  useEffect(() => {
    setNewComment(comment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const handleSaveComment = async (): Promise<void> => {
    setIsSubmitting(true);
    saveCardItem('comment', newComment, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoards();
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setIsSubmitting(false);
  };
  const handleDeleteComment = async (): Promise<void> => {
    setIsSubmitting(true);
    deleteCardItem('comment', newComment, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoards();
      } else {
        // should not get here from backend but this catch is for an unknown issue
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
          <ModeCommentOutlinedIcon className={classes.textSpacing} />
          <Typography className={classes.cardItemTitle} variant="h6">
            Add Comment:
          </Typography>
        </DialogContentText>
        <Box className={classes.textAreaContainer}>
          <TextareaAutosize
            value={newComment}
            aria-label="minimum height"
            placeholder="There is no description for this card"
            className={classes.textArea}
            disabled={disableSetting}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box className={classes.saveButtonContainer}>
            {' '}
            <Button
              onClick={handleSaveComment}
              disabled={disableSetting || isSubmitting}
              size="small"
              variant="contained"
            >
              {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Save'}
            </Button>{' '}
            <IconButton
              disabled={disableSetting}
              color="primary"
              aria-label="close"
              size="small"
              onClick={handleDeleteComment}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
