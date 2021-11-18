import { IconButton } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { IIds } from '../../../../../interface/Board';
import DialogContentText from '@mui/material/DialogContentText';
import { saveCardItem, deleteCardItem } from '../../../../../helpers/APICalls/cardApiCalls';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useState, useEffect } from 'react';
import { useBoard } from '../../../../../context/useBoardContext';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface Props {
  dueDate: Date | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardDeadline({ dueDate, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [date, setDate] = useState(dueDate);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateBoard, boards } = useBoard();

  useEffect(() => {
    if (dueDate) {
      setDate(dueDate);
    }
  }, [dueDate]);

  const handleChange = (newValue: Date | null) => {
    if (newValue) setDate(newValue);
  };

  const handleSaveDeadline = async (): Promise<void> => {
    setIsSubmitting(true);
    saveCardItem('deadline', date, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoard();
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
        updateSnackBarMessage(data.error.message);
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
