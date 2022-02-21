import { IconButton, CircularProgress } from '@material-ui/core';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import useStyles from '../../useStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { IIds } from '../../../../../interface/Board';
import ChecklistPlugin from '../../../../ChecklistPlugin/ChecklistPlugin';

interface Props {
  checklist: { item: string; isChecked: boolean; _id: string }[] | undefined;
  displayChecklist: boolean;
  ids: IIds | undefined;
}

export default function CardChecklist({ checklist, displayChecklist, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [list, setList] = useState([
    {
      item: 'Demo',
      isChecked: false,
      _id: '1',
    },
  ]);
  const [newItem, setNewItem] = useState('');
  const [displayInput, setDisplayInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (checklist) {
      setList(checklist);
    }
  }, [checklist]);

  const handleSaveCheckList = async (): Promise<void> => {
    // api call to save it to the database

    setList([...list, { item: newItem, isChecked: false, _id: '12' }]);
    setNewItem('');
  };

  const handleCheck = async (_id: string): Promise<void> => {
    // api call to checkitems it to the database
  };

  const handleDeleteList = async (_id: string): Promise<void> => {
    // api call to delete it to the database
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
              {list.map((item: any, index: number) => (
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
        <ChecklistPlugin displayChecklist={displayChecklist} />
      </Box>
    </>
  );
}
