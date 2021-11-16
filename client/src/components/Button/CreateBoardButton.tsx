import React from 'react';
import { Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import useStlyes from './useStyles';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

/**
 * Button component for handling creating
 * new boards.
 * @component
 * @param ButtonProps
 * @returns {JSX.Element}
 */
export default function CreateBoardButton({ onClick }: ButtonProps): JSX.Element {
  const classes = useStlyes();
  return (
    <Button
      className={classes.createButton}
      disableElevation
      variant="contained"
      color="primary"
      size="large"
      startIcon={<AddOutlined />}
      onClick={onClick}
    >
      Create board
    </Button>
  );
}
