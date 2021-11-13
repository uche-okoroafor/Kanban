import { useState } from 'react';
import useStyles from './useStyles';
import { Box, Button, Modal, Typography } from '@material-ui/core';
import { uploadProfileImage } from '../../helpers/APICalls/upload';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  file: any;
  onHandleClose: () => void;
  open: boolean;
  onSetFile: any;
  setOpen: any;
}

const RenderFile = ({ file, onHandleClose, open, onSetFile, setOpen }: Props): JSX.Element => {
  const sizeInBytes = `${(parseInt(file?.size) / (1024 * 1024)).toFixed(2)} MB`;
  const fileFormat = file?.type.split('/')[1];
  const classes = useStyles();
  const [uploadState, setUploadState] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoginContext } = useAuth();

  const handleUpload = () => {
    if (uploadState === 'uploading...') {
      return;
    }
    setUploadState('uploading...');
    uploadProfileImage(file).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
        setUploadState('picture upload failed!');
        onSetFile(null);
        setOpen(false);
        setTimeout(() => {
          setUploadState('');
        }, 3000);
      } else if (data.success) {
        updateLoginContext(data.success);
        setUploadState('picture uploaded successfully');
        onSetFile(null);
        setOpen(false);
        setTimeout(() => {
          setUploadState('');
        }, 3000);
      } else {
        updateSnackBarMessage('Unexpected error! Please try again');
      }
    });
  };
  return (
    <Modal
      open={open}
      onClose={onHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.dropBox}>
        <Box className={classes.imageBox}>
          <img loading="lazy" className={classes.uploadImage} src={`/assets/${fileFormat}.png`} alt="" />
          <Typography>{file?.name}</Typography>
          <Typography>{sizeInBytes}</Typography>
          <Button onClick={handleUpload} className={classes.buttonStyle} color="primary" variant="contained">
            {uploadState ? uploadState : 'Upload'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RenderFile;
