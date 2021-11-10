import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import { Box, Modal, Typography, Input } from '@material-ui/core';
import Image from '../../Images/upload.png';

interface Props {
  open: boolean;
  onHandleClose: () => void;
  onSetFile: (acceptableFile: { [prop: string]: string | number }) => void;
}

const DropZone = ({ open, onHandleClose, onSetFile }: Props): JSX.Element => {
  const onDrop = useCallback(
    (acceptedFile) => {
      onSetFile(acceptedFile[0]);
    },
    [onSetFile],
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpeg, image/png',
  });
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.dropBox} {...getRootProps()}>
        <Input inputProps={{ ...getInputProps() }} />
        <Box
          className={isDragAccept ? classes.imageBoxAccept : isDragReject ? classes.imageBoxReject : classes.imageBox}
        >
          <img loading="lazy" className={classes.uploadImage} src={Image} alt="" />
          {isDragReject ? (
            <Typography>Sorry, This app only supports images and mp3</Typography>
          ) : (
            <Box className={classes.typographyBox}>
              <Typography className={classes.typography}>
                drop your profile picture,{' '}
                <Box component="span" className={classes.typographySpan}>
                  browse
                </Box>
              </Typography>
              <Typography className={classes.typography}>Only jpeg & png files supported</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DropZone;
