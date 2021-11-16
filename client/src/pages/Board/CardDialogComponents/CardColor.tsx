import useStyles from '../useStyles';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { saveCardItem } from '../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../interface/Boards';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useBoard } from '../../../context/useBoardContext';

interface Props {
  tagColor: string | undefined;
  disableSetting: boolean;
  ids: IIds | undefined;
}

export default function CardColor({ tagColor, disableSetting, ids }: Props): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorTag, setColorTag] = useState(tagColor);
  const colors = ['#fcba03', '#5de3c4', '#de602f', '#de2fcf', '#494bd6'];
  const open = Boolean(anchorEl);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateBoards, boards } = useBoard();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setColorTag(tagColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const handleSaveCardColor = async (colorParams: string): Promise<void> => {
    setColorTag(colorParams);
    saveCardItem('tagColor', colorTag, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateBoards();
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    handleClose();
  };

  return (
    <>
      {' '}
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ width: '40%' }}
        disabled={disableSetting}
      >
        <Box
          className={classes.cardTagColor}
          style={{
            background: colorTag,
          }}
        ></Box>
      </Button>
      <Menu
        id="basic-menu"
        style={{ width: '40%', right: '10%' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {colors.map((color: string) => (
          <MenuItem key={color} onClick={() => handleSaveCardColor(color)}>
            {' '}
            <Box className={classes.cardTagColor} style={{ width: 100, background: color, right: '10%' }}></Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
