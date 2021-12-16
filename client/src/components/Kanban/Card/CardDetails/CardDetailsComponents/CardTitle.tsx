import useStyles from '../../useStyles';
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { TextField } from '@mui/material';
import { saveCardItem } from '../../../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../../../interface/Board';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useBoard } from '../../../../../context/useBoardContext';

interface Props {
  cardTitle: string | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardTitle({ cardTitle, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [title, setTitle] = useState(cardTitle);
  const [enableTitleEdit, setEnableTitleEdit] = useState(false);
  const { updateBoard } = useBoard();

  useEffect(() => {
    if (cardTitle) {
      setTitle(cardTitle);
    }
  }, [cardTitle]);
  const handleSaveTitle = async (): Promise<void> => {
    setEnableTitleEdit(false);
    saveCardItem('title', title, ids).then((data) => {
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
  };

  useEffect(() => {
    if (disableSetting) {
      setEnableTitleEdit(false);
    }
  }, [disableSetting]);

  return (
    <>
      {!enableTitleEdit ? (
        <Typography
          onClick={() => setEnableTitleEdit(true)}
          style={{ cursor: 'pointer' }}
          className={classes.cardTitle}
          variant="h6"
        >
          {' '}
          {title}
        </Typography>
      ) : (
        <TextField
          id="cardTitle"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSaveTitle}
          value={title}
          variant="standard"
        />
      )}
    </>
  );
}
