import Grid from '@material-ui/core/Grid';
import { IconButton, Typography } from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import useStyles from '../useStyles';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState, useCallback } from 'react';
import { Box } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
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
import DeleteDialog from '../../../DeleteDialog/DeleteDialog';

interface Props {
  displayedCard: ICard | null;
  ids: IIds;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
}

export default function CardDetails({ displayedCard, ids, openDialog, setOpenDialog }: Props): JSX.Element {
  const classes = useStyles();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [card, setCard] = useState<ICard | null>(displayedCard);
  const [disableSetting, setDisableSetting] = useState(true);
  const [displayAttachment, setDisplayAttachment] = useState(false);
  const [displayChecklist, setDisplayChecklist] = useState(false);

  const closeCardDetails = () => {
    setOpenDialog(false);
  };
  const handleOpenDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(true);
  }, [setOpenDeleteDialog]);

  useEffect(() => {
    if (displayedCard) {
      setCard(displayedCard);
    }
  }, [displayedCard]);

  return (
    <>
      <Dialog open={openDialog} maxWidth="xl" onClose={closeCardDetails}>
        <DialogTitle style={{ paddingBottom: '5px' }} className={classes.dialogTitle}>
          <IconButton
            aria-label="close"
            style={{ position: 'absolute', top: '25%', right: 0, marginRight: '10px' }}
            onClick={() => setOpenDialog(false)}
          >
            <CloseIcon />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            style={{ whiteSpace: 'nowrap', position: 'relative', maxWidth: '40%' }}
          >
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
          <Box style={{ position: 'relative' }}>
            {' '}
            <IconButton
              onClick={handleOpenDeleteDialog}
              style={{ position: 'absolute', width: '1rem', height: '0.5rem', right: '10%', top: '-140%' }}
            >
              {' '}
              <DeleteIcon style={{ color: '#E83A30' }} />
            </IconButton>
            <Typography style={{ paddingLeft: '2rem', fontSize: '0.8rem' }}>In List {'column Title'} </Typography>
          </Box>
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
      <DeleteDialog
        openDialog={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
        item={'card'}
        title={String(card?.cardTitle)}
        ItemsIds={ids}
      />
    </>
  );
}
