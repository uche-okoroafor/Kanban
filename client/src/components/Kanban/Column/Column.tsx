import { Box, Grid, Typography } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from '../../../interface/Card';
import { Column } from '../../../interface/Column';
import CardComponent from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import useStyles from './useStyles';

type ColumnProps = Column & { index: number };
const ColumnComponent = ({ _id, name, cards, index }: ColumnProps): JSX.Element => {
  const classes = useStyles();
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
                  {name}
                </Typography>
              </Box>
              <Droppable droppableId={_id} type="card">
                {(provided) => {
                  return (
                    <Grid container {...provided.droppableProps} ref={provided.innerRef} direction="column">
                      {cards.map((card: Card, index: number) => {
                        return (
                          <CardComponent
                            key={card._id}
                            cardId={card._id}
                            columnId={card.columnId}
                            name={card.name}
                            tag={card.tag || 'white'}
                            index={index}
                          />
                        );
                      })}
                      {provided.placeholder}
                      <CardForm columnId={_id} />
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
