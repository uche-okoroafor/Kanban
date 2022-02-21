import { IconButton } from '@material-ui/core';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { IIds } from '../../../../../interface/Board';
import DialogContentText from '@mui/material/DialogContentText';
import { updateCardItem, deleteCardItem } from '../../../../../helpers/APICalls/cardApiCalls';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useState, useEffect } from 'react';
import { useBoard } from '../../../../../context/useBoardContext';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface Props {
  deadline: Date | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardDeadline({ deadline, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [date, setDate] = useState(deadline);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateBoard, boards } = useBoard();

  useEffect(() => {
    if (deadline) {
      setDate(deadline);
    }
  }, [deadline]);

  const handleChange = (newValue: Date | null) => {
    if (newValue) setDate(newValue);
  };

  const handleSaveDeadline = async (): Promise<void> => {
    setIsSubmitting(true);
    updateCardItem('deadline', date, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
        setIsSubmitting(false);
      } else if (data.success) {
        updateBoard();
        updateSnackBarMessage('deadline has been updated');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setIsSubmitting(false);
  };
  const handleDeleteDeadline = async (): Promise<void> => {
    setIsSubmitting(true);

    deleteCardItem('deadline', date, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
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
          <AccessTimeOutlinedIcon className={classes.textSpacing} />
          <Typography className={classes.cardItemTitle} variant="h6">
            {' '}
            Deadline:
          </Typography>
        </DialogContentText>
        <Box className={classes.textAreaContainer}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disabled={disableSetting}
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField variant="standard" sx={{ width: 250 }} {...params} />}
            />
          </LocalizationProvider>
          <Box className={classes.saveButtonContainer}>
            {' '}
            <Button
              variant="contained"
              onClick={handleSaveDeadline}
              disabled={disableSetting || isSubmitting}
              size="small"
            >
              {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Save'}
            </Button>{' '}
            <IconButton
              aria-label="close"
              color="primary"
              disabled={disableSetting}
              style={{ fontSize: '20px' }}
              onClick={handleDeleteDeadline}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
