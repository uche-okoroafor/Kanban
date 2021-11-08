import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

export default function DropZone(): JSX.Element {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1 });
  const classes = useStyles();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <Box className={classes.paper}>
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box className={classes.inputContainer}>
          <Typography className={classes.input}>Drag and Drop profile picture here or click to add photo.</Typography>
          <Box className={classes.uploadContainer}>
            <CloudUploadOutlinedIcon fontSize="large" />
          </Box>
        </Box>
        <Box>
          <Typography>File:</Typography>
          <ul>{files}</ul>
        </Box>
      </Box>
    </Box>
  );
}
