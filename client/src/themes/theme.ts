import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiInput: {
      input: {
        '&::placeholder': {
          color: '#000',
          opacity: '100%',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      },
    },
  },
});
