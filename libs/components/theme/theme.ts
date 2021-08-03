import { createTheme } from '@material-ui/core/styles';

export const yellow = '#FFD000';
export const shadeOfYellow = '#F7CB16';
export const shadeOfBlack = '#171717';
export const opaqueYellow = 'rgba(247,203,22,0.29)';
export const black = '#000000';
export const white = '#FFFFFF';
export const pink = '#DF318F';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow,
    },
    secondary: {
      main: white,
    },
    background: {
      default: black,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: 2,
        },
      },
      defaultProps: {
        variant: 'outlined',
        position: 'static',
        color: 'transparent',
        elevation: 0,
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          marginLeft: 'auto',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
        },
      },
      defaultProps: {
        color: 'secondary',
        variant: 'contained',
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#e5e5e5',

        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        content: {
          display: 'flex',
          width: '50%',
          m: 'auto',
          justifyContent: 'center',
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          paddingTop: 20,
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: 180,

        },
      },
      defaultProps: {
        maxWidth: 'xs',
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },

    MuiLinearProgress:{
      styleOverrides:{
        barColorPrimary:{
          backgroundColor: shadeOfYellow,
          opacity: '1',
          height: '8px',
          borderRadius: '12px',
        },
        colorPrimary:{
          backgroundColor: opaqueYellow,
          height: '8px',
          borderRadius: '12px',
        }
      }
    },

  },
});

export default theme;
