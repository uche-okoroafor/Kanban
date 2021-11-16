import useStyles from '../../useStyles';
import { Box, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {
  setDisableSetting: React.Dispatch<boolean>;
  displayAttachment: boolean;
  displayChecklist: boolean;
  setDisplayChecklist: React.Dispatch<boolean>;
  setDisplayAttachment: React.Dispatch<boolean>;
}

export default function CardOperationBtnTexts({
  setDisableSetting,
  displayAttachment,
  displayChecklist,
  setDisplayChecklist,
  setDisplayAttachment,
}: Props): JSX.Element {
  const classes = useStyles();

  const handleDisplayAttachment = (): void => {
    setDisplayAttachment(!displayAttachment);
    setDisplayChecklist(false);
  };

  const handleDisplayChecklist = (): void => {
    setDisplayChecklist(!displayChecklist);
    setDisplayAttachment(false);
  };
  const handleDisplayOtherItems = (): void => {
    setDisplayAttachment(false);
    setDisplayChecklist(false);
  };

  return (
    <>
      <Box className={classes.buttonContainer}>
        {' '}
        <Typography className={classes.operationBtnText}>SECTIONS</Typography>{' '}
        <Stack spacing={1}>
          <Button
            onClick={handleDisplayOtherItems}
            variant={!displayAttachment && !displayChecklist ? 'contained' : 'outlined'}
            size="small"
          >
            Description
          </Button>
          <Button
            onClick={handleDisplayOtherItems}
            variant={!displayAttachment && !displayChecklist ? 'contained' : 'outlined'}
            size="small"
          >
            Deadline
          </Button>
          <Button
            onClick={handleDisplayOtherItems}
            variant={!displayAttachment && !displayChecklist ? 'contained' : 'outlined'}
            size="small"
          >
            Comment
          </Button>
          <Button onClick={handleDisplayChecklist} variant={displayChecklist ? 'contained' : 'outlined'} size="small">
            Checklist
          </Button>
          <Button onClick={handleDisplayAttachment} variant={displayAttachment ? 'contained' : 'outlined'} size="small">
            Attachment
          </Button>
        </Stack>
      </Box>{' '}
      <Box className={classes.buttonContainer}>
        {' '}
        <Typography className={classes.operationBtnText}>ACTIONS</Typography>
        <Stack spacing={1}>
          <Button variant="outlined" size="small">
            Move
          </Button>
          <Button variant="outlined" size="small">
            Copy
          </Button>
          <Button variant="outlined" size="small">
            Share
          </Button>
          <Button variant="outlined" size="small">
            Delete
          </Button>
        </Stack>
      </Box>
    </>
  );
}
