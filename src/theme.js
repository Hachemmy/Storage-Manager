import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#1e88e5' : '#1565c0',
        light: isDark ? '#42a5f5' : '#1e88e5',
        dark: isDark ? '#1565c0' : '#0d47a1',
        contrastText: '#fff',
      },
      secondary: {
        main: isDark ? '#26c6da' : '#0097a7',
        light: isDark ? '#4dd0e1' : '#26c6da',
        dark: isDark ? '#0097a7' : '#006064',
        contrastText: '#fff',
      },
      background: {
        default: isDark ? '#0a0e27' : '#f5f7fa',
        paper: isDark ? '#121212' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#1a1a1a',
        secondary: isDark ? '#b0bec5' : '#666666',
      },
      error: {
        main: '#f44336',
        light: isDark ? '#ef5350' : '#ffcdd2',
      },
      warning: {
        main: '#ff9800',
        light: isDark ? '#ffb74d' : '#ffe0b2',
      },
      success: {
        main: '#4caf50',
        light: isDark ? '#81c784' : '#c8e6c9',
      },
      info: {
        main: isDark ? '#29b6f6' : '#0288d1',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.25px',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: isDark ? '#424242 #1e1e1e' : '#cccccc #f5f5f5',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? '#1e1e1e' : '#f5f5f5',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? '#424242' : '#cccccc',
              borderRadius: '4px',
              '&:hover': {
                background: isDark ? '#616161' : '#999',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.95) 100%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isDark
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark 
                ? '0 12px 48px rgba(30, 136, 229, 0.2)'
                : '0 12px 48px rgba(21, 101, 192, 0.15)',
              borderColor: isDark ? 'rgba(30, 136, 229, 0.3)' : 'rgba(21, 101, 192, 0.2)',
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 8,
            borderRadius: 4,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          },
          bar: {
            borderRadius: 4,
            background: isDark
              ? 'linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%)'
              : 'linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '10px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'left 0.3s ease',
            },
            '&:hover::before': {
              left: '100%',
            },
          },
          contained: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
            '&:hover': {
              borderColor: isDark ? 'rgba(30, 136, 229, 0.6)' : 'rgba(21, 101, 192, 0.6)',
              backgroundColor: isDark ? 'rgba(30, 136, 229, 0.1)' : 'rgba(21, 101, 192, 0.05)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: isDark 
              ? 'rgba(18, 18, 18, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
            borderBottom: isDark 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDark
              ? '0 8px 32px rgba(0, 0, 0, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark
              ? 'linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.95) 100%)',
            borderRight: isDark 
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
          filled: {
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 136, 229, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(21, 101, 192, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease',
          },
          head: {
            backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 247, 250, 0.8)',
            fontWeight: 700,
            fontSize: '0.9rem',
            backgroundImage: isDark
              ? 'linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(76, 175, 80, 0.05) 100%)',
          },
          body: {
            '&:hover': {
              backgroundColor: isDark ? 'rgba(30, 136, 229, 0.08)' : 'rgba(21, 101, 192, 0.05)',
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(30, 136, 229, 0.08)' : 'rgba(21, 101, 192, 0.05)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? 'linear-gradient(135deg, rgba(30, 136, 229, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(21, 101, 192, 0.03) 0%, rgba(76, 175, 80, 0.02) 100%)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.2s ease',
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(30, 136, 229, 0.5)' : 'rgba(21, 101, 192, 0.4)',
              },
              '&.Mui-focused': {
                boxShadow: isDark
                  ? '0 0 0 3px rgba(30, 136, 229, 0.1)'
                  : '0 0 0 3px rgba(21, 101, 192, 0.1)',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: isDark ? '#1e88e5' : '#1565c0',
            fontWeight: 700,
            fontSize: '0.75rem',
          },
        },
      },
    },
  });
};

export { getTheme };
