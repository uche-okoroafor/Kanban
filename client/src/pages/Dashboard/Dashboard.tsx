<<<<<<< HEAD
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import DropZone from '../../components/DropZone/DropZone';
import RenderFile from '../../components/RenderFile/RenderFile';
import CardCover from '../../components/CardCoverPlugin/CardCover';
import CardAttachment from '../../components/CardAttachmentPlugin/CardAttachment';
=======
import { Box } from '@material-ui/core';
import Board from '../../components/Kanban/Board';
>>>>>>> origin/card_cover_plugin_ui

export default function Dashboard(): JSX.Element {
  return (
<<<<<<< HEAD
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner onHandleOpen={handleOpen} loggedInUser={loggedInUser} />
        <CardAttachment />
        <DropZone open={open && !file} onHandleClose={handleClose} onSetFile={setFile} />
        <RenderFile
          onHandleClose={handleClose}
          file={file}
          open={file ? true : false}
          onSetFile={setFile}
          setOpen={setOpen}
        />
      </Grid>
    </Grid>
=======
    <Box m={2}>
      <Board />
    </Box>
>>>>>>> origin/card_cover_plugin_ui
  );
}
