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
    primary: { main: '#1A545C', contrastText: '#ffffff' },
    secondary: { main: '#ffffff', contrastText: '#f8ab12', light: '#f8cf7c' },
    info: { main: '#F4F6FF' },
    warning: { main: '#FFBA32' },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
      // secondary: '#9BA9CC',
      // warning: '#FFBA32',
    },
    tags: {
      white: '#FFFFFF',
      green: '#5ACD76',
      red: '#FF5D48',
      yellow: '#EDAB1D',
      blue: '#59B0FF',
      purple: '#D460F7',
    },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiButton: {
      containedSizeSmall: {
        color: '#ffffff',
        backgroundColor: '#1A545C',
        '&:hover': {
          backgroundColor: '#1A545C',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: '#1A545C',
          },
        },
      },

      contained: {
        color: '#ffffff',
        backgroundColor: '#1A545C',
        '&:hover': {
          backgroundColor: '#0f3b41',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: '#0f3b41',
          },
        },
      },
      containedPrimary: {
        color: '#ffffff',
        backgroundColor: '#1A545C',
        '&:hover': {
          backgroundColor: '#0f3b41',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: '#1A545C',
          },
        },
      },
      // outlined: {
      //   color: '#1A545C',
      //   // backgroundColor: '#ffffff',
      //   '&:hover': {
      //     backgroundColor: '#1A545C',
      //     // Reset on touch devices, it doesn't add specificity
      //     '@media (hover: none)': {
      //       backgroundColor: '#1A545C',
      //     },
      //   },
      // },
    },
  },
});
