import { IconButton } from '@material-ui/core';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Stack from '@mui/material/Stack';
import { IIds } from '../../../../../interface/Board';

interface Props {
  attachment: { imageName: string; imageSource: string; _id: number | string } | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardAttachment({ attachment, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [image, setImage] = useState<any>('attachment');
  const [imageName, setImageName] = useState(attachment?.imageName);
  const [imageSource, setImageSource] = useState(attachment?.imageSource);
  const [displayInput, setDisplayInput] = useState(false);

  useEffect(() => {
    if (attachment) {
      setImageName(attachment?.imageName);
      setImageSource(attachment?.imageSource);
    }
  }, [attachment]);

  const handleDeleteAttachment = async (): Promise<void> => {
    // a request to delete attachment
  };
  const handleSaveAttachment = async (): Promise<void> => {
    //a requset to save attachment
    setDisplayInput(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDisplayInput(true);
    if (e.target.files) {
      setImageSource(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  return (
    <>
      <Box style={{ position: 'relative', minHeight: 400 }}>
        <DialogContentText style={{ display: 'flex', alignItems: 'center' }}>
          <AttachFileOutlinedIcon style={{ marginRight: '10px' }} />
          <Typography variant="h6"> Attachment:</Typography>
        </DialogContentText>
        <Box style={{ paddingLeft: '40px', width: '90%' }}>
          <img src={imageSource} alt={imageName} loading="lazy" style={{ maxWidth: 500, maxHeight: 300 }} />

          <Box>
            {displayInput ? (
              <TextField
                id="standard-basic"
                style={{ width: '20%', whiteSpace: 'nowrap' }}
                label="Add Name"
                variant="standard"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
              />
            ) : (
              <Typography>{imageName}</Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1} style={{ position: 'absolute', bottom: 0 }}>
            {' '}
            <Button variant="contained" component="label">
              Add Attachment
              <input onChange={handleChange} type="file" hidden />
            </Button>
            <Button onClick={handleSaveAttachment} variant="contained">
              Save
            </Button>{' '}
            <IconButton aria-label="close" onClick={handleDeleteAttachment}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
