import { alpha, createTheme } from '@mui/material/styles';

const indigo = '#4f46e5';
const cyan = '#06b6d4';
const slate = '#0f172a';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: indigo,
      dark: '#3730a3',
      light: '#818cf8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan,
      dark: '#0891b2',
      light: '#67e8f9',
      contrastText: '#082f49',
    },
    success: {
      main: '#16a34a',
    },
    warning: {
      main: '#f97316',
    },
    error: {
      main: '#dc2626',
    },
    background: {
      default: '#f3f7ff',
      paper: '#ffffff',
    },
    text: {
      primary: slate,
      secondary: '#334155',
    },
    divider: alpha(slate, 0.12),
    action: {
      hover: alpha(indigo, 0.08),
      selected: alpha(indigo, 0.12),
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
    h1: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle2: {
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${alpha(indigo, 0.35)} transparent`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)',
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
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(slate, 0.08)}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
