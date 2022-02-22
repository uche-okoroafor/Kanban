import { Box, Button, CircularProgress, Paper, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Board from '../../components/Kanban/Board';
import { useAuth } from '../../context/useAuthContext';
import { stringAvatar } from './useStyles';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { uploadImage } from '../../helpers/APICalls/imageApis';
import { useSnackBar } from '../../context/useSnackbarContext';
import { IFile } from '../../interface/File';

export default function Profile(): JSX.Element {
  const { loggedInUser, updateUserImage } = useAuth();
  const [file, setFile] = useState<IFile | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const onDrop = useCallback(
    (acceptedFile) => {
      setFile(acceptedFile[0]);
      setImage(URL.createObjectURL(acceptedFile[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFile],
  );
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpeg, image/png',
  });

  useEffect(() => {
    if (loggedInUser?.imageUrl !== undefined) return setImage(loggedInUser?.imageUrl);
  }, [loggedInUser]);

  const handleSaveImage = async (): Promise<void> => {
    setUploading(true);
    try {
      const { data } = await uploadImage(file);
      if (data) {
        if (data.success) {
          console.log(data, data.imageUrl, 'data');
          updateUserImage(data.imageUrl);
          setFile(null);
          setUploading(false);
          updateSnackBarMessage('Profile picture  has been updated');
        } else if (data?.error) {
          updateSnackBarMessage(data?.error?.message);
        }
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('Unexpected error! Please try again');
    }
    setUploading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '70vh' }} m={2}>
      <Paper
        style={{
          width: '30%',
          height: '350px',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          padding: '50px',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            {...stringAvatar(loggedInUser?.username ? loggedInUser?.username.toUpperCase() : 'B', 90, 90)}
            src={image}
          />
          <Typography variant="h5">{loggedInUser?.username}</Typography>
          <Box>
            <Typography align="center" variant="h6">
              email : {loggedInUser?.email}
            </Typography>
          </Box>
          <Stack display="flex" spacing={2} justifyContent={'center'}>
            <Typography align="center">Update profile picture</Typography>
            {file === null ? (
              <div style={{ display: 'flex', justifyContent: 'center' }} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragReject ? (
                  <Box>Drop </Box>
                ) : (
                  <Button style={{ marginBottom: '10px' }} startIcon={<FileOpenIcon />} variant="contained">
                    BROWSE
                  </Button>
                )}
              </div>
            ) : (
              <Button onClick={handleSaveImage} variant="contained">
                {uploading ? (
                  <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px', color: 'white' }} />
                ) : (
                  'SAVE'
                )}
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
