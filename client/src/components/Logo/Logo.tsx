import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';
import { Stack } from '@mui/material';

export default function Logo(): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Box
        display="flex"
        justifyContent="space-evenly"
        style={{ padding: '10px  11px', borderRadius: '15px', background: '#1A545C' }}
      >
        <Stack style={{ marginRight: '4px' }}>
          <Box style={{ background: '#6D9C99', width: '11px', height: '8px', borderRadius: '2px' }}></Box>
          <Box
            style={{
              background: '#36898C',
              marginTop: '4px',
              height: '15px',
              width: '11px',
              borderRadius: '2px',
            }}
          ></Box>
        </Stack>
        <Stack>
          <Box style={{ background: '#36898C', width: '11px', height: '15px', borderRadius: '2px' }}></Box>
          <Box
            style={{ background: '#6D9C99', marginTop: '4px', width: '11px', height: '8px', borderRadius: '2px' }}
          ></Box>{' '}
        </Stack>
      </Box>

      <Typography style={{ marginLeft: '5px', fontWeight: 'bolder', color: '#1A545C', fontSize: '1.5rem' }}>
        Kanban
      </Typography>
    </Box>
  );
}
