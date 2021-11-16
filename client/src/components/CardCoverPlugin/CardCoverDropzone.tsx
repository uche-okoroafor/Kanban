import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import { Box, Typography, Input } from '@material-ui/core';
import { CloudUploadOutlined } from '@material-ui/icons';

interface Props {
  onSetFile: (acceptableFile: { [prop: string]: string | number }) => void;
  file: { [props: string]: string | number } | null;
}

function CardCoverDropzone({ onSetFile, file }: Props): JSX.Element {
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
  let fileFormat;
  if (typeof file?.type === 'string') {
    fileFormat = file?.type.split('/')[1];
  }
  return (
    <Box className={file ? classes.imageDropBoxUploaded : classes.imageDropBox} {...getRootProps()}>
      {file ? (
        <Box className={classes.iconBox}>
          <img loading="lazy" className={classes.uploadImage} src={`/assets/${fileFormat}.png`} alt="" />
          <Typography className={classes.iconText}>File added successfully</Typography>
        </Box>
      ) : (
        <Box className={classes.iconBox}>
          <CloudUploadOutlined
            style={{
              height: '2rem',
              width: '2rem',
            }}
          />
          <Typography className={classes.iconText}>Drag and drop file here or click to select file</Typography>
        </Box>
      )}
      <Input inputProps={{ ...getInputProps() }} />
    </Box>
  );
}

export default CardCoverDropzone;
