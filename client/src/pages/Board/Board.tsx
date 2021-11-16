import Grid from '@material-ui/core/Grid';
import { IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useStyles from './useStyles';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardTitle from './CardDialogComponents/CardTitle';
import CardColor from './CardDialogComponents/CardColor';
import CardDescription from './CardDialogComponents/CardDescription';
import CardDeadline from './CardDialogComponents/CardDeadline';
import CardComment from './CardDialogComponents/CardComment';
import CardChecklist from './CardDialogComponents/CardChecklist';
import CardAttachment from './CardDialogComponents/CardAttachment';
import CardOperationBtns from './CardDialogComponents/CardOperationBtns';
import mockCard from '../../mocks/mockCard';
import { ICard, IIds, IBoard } from '../../interface/Boards';
import Stack from '@mui/material/Stack';
import { useBoard } from '../../context/useBoardContext';

export default function Board(): JSX.Element {
  const classes = useStyles();

  const [displayedCard, SetDisplayedCard] = useState<ICard | null>(null);
  const [ids, setIds] = useState<IIds | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const { boards } = useBoard();
  const [displayedBoard, SetDisplayedBoard] = useState<IBoard | undefined>(mockCard[0]);

  const closeCardDetails = () => {
    setOpenDialog(false);
  };
  const [disableSetting, setDisableSetting] = useState(true);
  const [displayAttachment, setDisplayAttachment] = useState(false);
  const [displayChecklist, setDisplayChecklist] = useState(false);

  useEffect(() => {
    if (boards) {
      // console.log(boards, 'boards');
      setTimeout(() => {
        // SetDisplayedBoard(boards[0]);
      }, 1000);
      console.log(boards[0], 'boards2');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const openCardDetails = (card: ICard, cardId: string, columnId: string, boardId: string): void => {
    console.log(boards);
    setIds({
      cardId,
      columnId,
      boardId,
    });
    SetDisplayedCard(card);
    setOpenDialog(true);
  };

  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center' }} component="main">
      <Stack spacing={1} direction="row">
        {displayedBoard?.columns.map((column) => (
          <Box
            style={{
              height: '50vh',
              backgroundColor: '#e0e0e0',
              width: 300,
            }}
            key={column._id}
          >
            <Typography>{column.columnTitle}</Typography>
            <Stack>
              {column.cards.map((card: ICard) => (
                <Box
                  key={card._id}
                  onClick={() => openCardDetails(card, card._id, column._id, displayedBoard?._id)}
                  style={{
                    height: 50,
                    width: 200,
                    background: card.tagColor,
                    margin: '3rem',
                    cursor: 'pointer',
                  }}
                >
                  {card.cardTitle}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

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
            <CardTitle ids={ids} disableSetting={disableSetting} cardTitle={displayedCard?.cardTitle} />{' '}
            <CardColor ids={ids} disableSetting={disableSetting} tagColor={displayedCard?.tagColor} />
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
                <CardDescription ids={ids} description={displayedCard?.description} disableSetting={disableSetting} />
                <CardDeadline ids={ids} deadline={displayedCard?.deadline} disableSetting={disableSetting} />
                <CardComment ids={ids} comment={displayedCard?.comment} disableSetting={disableSetting} />
              </>
            ) : displayChecklist ? (
              <CardChecklist ids={ids} checklist={displayedCard?.checklist} disableSetting={disableSetting} />
            ) : (
              <CardAttachment ids={ids} attachment={displayedCard?.attachment} disableSetting={disableSetting} />
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
    </Grid>
  );
}
