import Grid from '@material-ui/core/Grid';
import { IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useStyles from '../useStyles';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardTitle from './CardDetailsComponents/CardTitle';
import CardColor from './CardDetailsComponents/CardColor';
import CardDescription from './CardDetailsComponents/CardDescription';
import CardDeadline from './CardDetailsComponents/CardDeadline';
import CardComment from './CardDetailsComponents/CardComment';
import CardChecklist from './CardDetailsComponents/CardChecklist';
import CardAttachment from './CardDetailsComponents/CardAttachment';
import CardOperationBtns from './CardDetailsComponents/CardOperationBtns';
import { IIds, IBoard } from '../../../../interface/Board';
import { ICard } from '../../../../interface/Card';

interface Props {
  displayedCard: ICard | null;
  ids: IIds | undefined;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
}

export default function CardDetails({ displayedCard, ids, openDialog, setOpenDialog }: Props): JSX.Element {
  const classes = useStyles();

  const [card, setCard] = useState<ICard | null>(displayedCard);
  const closeCardDetails = () => {
    setOpenDialog(false);
  };
  const [disableSetting, setDisableSetting] = useState(true);
  const [displayAttachment, setDisplayAttachment] = useState(false);
  const [displayChecklist, setDisplayChecklist] = useState(false);

  useEffect(() => {
    if (displayedCard) {
      setCard(displayedCard);
    }
  }, [displayedCard]);

  return (
    <Dialog open={openDialog} maxWidth="xl" onClose={closeCardDetails}>
      <DialogTitle style={{ paddingBottom: '5px' }} className={classes.dialogTitle}>
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', right: 0, marginRight: '10px' }}
          onClick={() => setOpenDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex" alignItems="center" style={{ whiteSpace: 'nowrap', maxWidth: '40%' }}>
          <DashboardOutlinedIcon style={{ marginRight: '10px' }} />
          <CardTitle ids={ids} disableSetting={disableSetting} cardTitle={card?.cardTitle} />{' '}
          <CardColor ids={ids} disableSetting={disableSetting} tagColor={card?.tagColor} />
          <IconButton
            aria-label="close"
            color={disableSetting ? 'default' : 'primary'}
            onClick={() => setDisableSetting(!disableSetting)}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
        <Typography style={{ paddingLeft: '2rem', fontSize: '0.8rem' }}>In List {'column Title'} </Typography>
      </DialogTitle>

      <DialogContent
        style={{
          width: 800,
          padding: '20px 30px',
          display: 'flex',
        }}
      >
        <Box flexGrow="1">
          {' '}
          {!displayChecklist && !displayAttachment ? (
            <>
              <CardDescription ids={ids} description={card?.description} disableSetting={disableSetting} />
              <CardDeadline ids={ids} deadline={card?.deadline} disableSetting={disableSetting} />
              <CardComment ids={ids} comment={card?.comment} disableSetting={disableSetting} />
            </>
          ) : displayChecklist ? (
            <CardChecklist ids={ids} checklist={card?.checklist} displayChecklist={displayChecklist} />
          ) : (
            <CardAttachment ids={ids} attachment={card?.attachment} disableSetting={disableSetting} />
          )}
        </Box>
        <Box>
          <CardOperationBtns
            setDisableSetting={setDisableSetting}
            displayAttachment={displayAttachment}
            displayChecklist={displayChecklist}
            setDisplayChecklist={setDisplayChecklist}
            setDisplayAttachment={setDisplayAttachment}
          />
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
