import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function Inputs(): JSX.Element {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Input placeholder="Add title..." inputProps={{ 'aria-label': 'description' }} />
    </form>
  );
}
