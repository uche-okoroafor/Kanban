import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import { Box, Typography, Input } from '@material-ui/core';
import { CloudUploadOutlined } from '@material-ui/icons';

interface Props {
  onSetFile: (acceptableFile: { [props: string]: string | number }[]) => void;
  file: { [props: string]: string | number }[] | null;
}

function CardAttachmentDropzone({ onSetFile, file }: Props): JSX.Element {
  const onDrop = useCallback(
    (acceptedFile) => {
      onSetFile(acceptedFile);
    },
    [onSetFile],
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/jpeg, image/png',
  });
  const classes = useStyles();

  return (
    <Box className={file ? classes.imageDropBoxUploaded : classes.imageDropBox} {...getRootProps()}>
      {file ? (
        <Box className={classes.iconBox}>
          <img loading="lazy" className={classes.uploadImage} src={`/assets/png.png`} alt="" />
          <Typography className={classes.iconText}>Files added successfully</Typography>
        </Box>
      ) : (
        <Box className={classes.iconBox}>
          <CloudUploadOutlined
            style={{
              height: '2rem',
              width: '2rem',
            }}
          />
          <Typography className={classes.iconText}>
            Drag and drop multiple files here or click to select multiple files
          </Typography>
        </Box>
      )}
      <Input inputProps={{ ...getInputProps() }} />
    </Box>
  );
}

export default CardAttachmentDropzone;
