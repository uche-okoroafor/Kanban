import { IconButton, CircularProgress } from '@mui/material';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
// import { saveListItem, checkItem, deleteList } from '../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../../interface/Boards';

interface Props {
  checklist: any;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardChecklist({ checklist, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [list, setList] = useState(checklist);
  const [newItem, setNewItem] = useState('');
  const [displayInput, setDisplayInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSaveCheckList = async (): Promise<void> => {
    // try {
    //   const response = await saveListItem();
    //   setDisplayInput(false);
    //   setNewItem('');
    // } catch (err) {}

    setList([...list, { item: newItem, isChecked: false }]);
  };

  const handleCheck = async (id: string): Promise<void> => {
    //   try {
    //     const response = await checkItem();
    //   } catch (err) {}
  };

  const handleDeleteList = async (id: string): Promise<void> => {
    //   try {
    //     const response = await deleteList();
    //   } catch (err) {}
  };
  return (
    <>
      <Box style={{ position: 'relative', minHeight: 400 }}>
        <DialogContentText style={{ display: 'flex', alignItems: 'center' }}>
          <FactCheckOutlinedIcon style={{ marginRight: '10px' }} />
          <Typography variant="h6"> Checklist:</Typography>
        </DialogContentText>
        <Box style={{ paddingLeft: '40px', width: '90%' }}>
          <Box>
            <Stack>
              {list.map((item: any) => (
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    padding: '0 30px',
                    width: 300,
                  }}
                  key={item._id}
                >
                  <Box
                    style={{
                      width: 300,
                      flexGrow: 1,
                    }}
                  >
                    {' '}
                    <Typography>{item.item}</Typography>
                  </Box>
                  <Checkbox checked={item.isChecked} onChange={() => handleCheck(item._id)} />
                  <IconButton aria-label="close" onClick={() => handleDeleteList(item._id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              {displayInput && (
                <TextField
                  id="standard-basic"
                  style={{ width: '20%', whiteSpace: 'nowrap' }}
                  label="Add item"
                  variant="standard"
                  onChange={(e) => setNewItem(e.target.value)}
                />
              )}
            </Stack>
          </Box>
          <Box style={{ position: 'absolute', bottom: 0 }}>
            <Stack spacing={1} direction="row">
              <Button onClick={() => setDisplayInput(true)} variant="contained">
                Add Item
              </Button>
              <Button onClick={handleSaveCheckList} variant="contained">
                Save
              </Button>{' '}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
