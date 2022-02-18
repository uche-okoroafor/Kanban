import useStyles from '../../useStyles';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { updateCardItem } from '../../../../../helpers/APICalls/cardApiCalls';
import { IIds } from '../../../../../interface/Board';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useBoard } from '../../../../../context/useBoardContext';

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
  const { updateBoard, boards } = useBoard();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (tagColor) {
      setColorTag(tagColor);
    }
  }, [tagColor]);

  const handleSaveCardColor = async (colorParams: string): Promise<void> => {
    setColorTag(colorParams);
    updateCardItem('tagColor', colorParams, ids).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateBoard();
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
        {colors.map((color: string, index) => (
          <MenuItem key={color + index} onClick={() => handleSaveCardColor(color)}>
            {' '}
            <Box className={classes.cardTagColor} style={{ width: 100, background: color, right: '10%' }}></Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
