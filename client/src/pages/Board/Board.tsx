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
import CardTitle from './CardDetails/CardDetailsComponents/CardTitle';
import CardColor from './CardDetails/CardDetailsComponents/CardColor';
import CardDescription from './CardDetails/CardDetailsComponents/CardDescription';
import CardDeadline from './CardDetails/CardDetailsComponents/CardDeadline';
import CardComment from './CardDetails/CardDetailsComponents/CardComment';
import CardChecklist from './CardDetails/CardDetailsComponents/CardChecklist';
import CardAttachment from './CardDetails/CardDetailsComponents/CardAttachment';
import CardOperationBtns from './CardDetails/CardDetailsComponents/CardOperationBtns';
import CardDetails from './CardDetails/CardDetails';
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

      <CardDetails openDialog={openDialog} setOpenDialog={setOpenDialog} ids={ids} displayedCard={displayedCard} />
    </Grid>
  );
}
