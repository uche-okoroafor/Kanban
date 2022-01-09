import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from '../../../interface/Card';
import { Column } from '../../../interface/Column';
import CardComponent from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '../../../components/Dialog/Dialog';
import { useState, useCallback } from 'react';

type ColumnProps = Column & { index: number };
const ColumnComponent = ({ _id, columnTitle, cards, index }: ColumnProps): JSX.Element => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, [setOpenDialog]);

  const handleDelete = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => {
        return (
          <Grid
            xs={12}
            md={6}
            lg="auto"
            item
            className={classes.columnGridItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Box className={classes.columnWrapper} {...provided.dragHandleProps}>
              <Box className={classes.typographyWrapper}>
                <Typography className={classes.typography} variant="h5">
                  {columnTitle}
                </Typography>
                <IconButton
                  onClick={handleOpenDialog}
                  style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', right: '4%', top: '10%' }}
                >
                  {' '}
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Droppable droppableId={_id} type="card">
                {(provided) => {
                  return (
                    <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                      {cards.map((card: Card, index: number) => {
                        return (
                          <CardComponent
                            key={card._id}
                            // cardId={card._id}
                            columnId={_id}
                            card={card}
                            // cardTitle={card.cardTitle}
                            // tagColor={card.tagColor || 'white'}
                            index={index}
                          />
                        );
                      })}
                      {provided.placeholder}
                      <CardForm columnId={_id} />
                      <Dialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        item={'column'}
                        handleDelete={handleDelete}
                        title={columnTitle}
                      />
                    </Grid>
                  );
                }}
              </Droppable>
            </Box>
          </Grid>
        );
      }}
    </Draggable>
  );
};

export default ColumnComponent;
