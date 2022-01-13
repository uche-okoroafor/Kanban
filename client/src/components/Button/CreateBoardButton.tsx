import React from 'react';
import { Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import useStlyes from './useStyles';
import CreateItemDialog from '../CreateItemDialog/CreateItemDialog';
/**
 * Button component for handling creating
 * new boards.
 * @component
 * @param ButtonProps
 * @returns {JSX.Element}
 */
export default function CreateBoardButton(): JSX.Element {
  const classes = useStlyes();
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <>
      <Button
        className={classes.createButton}
        disableElevation
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddOutlined />}
        onClick={() => setOpenDialog(true)}
      >
        Create board
      </Button>
      <CreateItemDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        targetPosition={undefined}
        boardId={undefined}
        item={'board'}
      />
    </>
  );
}
