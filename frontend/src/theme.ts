import { alpha, createTheme } from '@mui/material/styles';

const ink = '#1c2d41';
const inkLight = '#2f4560';
const honey = '#c9943c';
const honeyLight = '#e4b86a';
const honeyDark = '#9a7028';
const sand = '#f3efe6';
const paper = '#fffcf7';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: ink,
      light: inkLight,
      dark: '#121f2e',
      contrastText: '#faf6ef',
    },
    secondary: {
      main: honey,
      light: honeyLight,
      dark: honeyDark,
      contrastText: '#1a140c',
    },
    error: {
      main: '#b44a40',
    },
    background: {
      default: sand,
      paper,
    },
    text: {
      primary: '#1e1a16',
      secondary: '#5c564c',
    },
    divider: alpha('#1c2d41', 0.12),
    action: {
      hover: alpha(ink, 0.06),
      selected: alpha(ink, 0.1),
    },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: '"Fraunces", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    subtitle2: {
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontSize: '0.68rem',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${alpha(ink, 0.25)} transparent`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          paddingInline: 1.5,
          '&.MuiButton-containedPrimary': {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 14px rgba(28, 45, 65, 0.25)',
            },
          },
          '&.MuiButton-containedSecondary': {
            color: '#1a140c',
            '&:hover': {
              boxShadow: `0px 4px 14px ${alpha(honeyDark, 0.35)}`,
            },
          },
          '&.MuiButton-outlined': {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
