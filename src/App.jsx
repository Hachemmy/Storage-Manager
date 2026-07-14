import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import StorageIcon from '@mui/icons-material/Storage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SdStorageIcon from '@mui/icons-material/SdStorage';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { getTheme } from './theme';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import SurveillanceDisque from './pages/SurveillanceDisque';
import VueGlobale from './pages/VueGlobale';
import DisquesDurs from './pages/DisquesDurs';

const LARGEUR_TIROIR = 260;
const LARGEUR_MINI_TIROIR = 88;

function PageConnexion({ courriel, motDePasse, erreur, mode, onCourrielChange, onMotDePasseChange, onSubmit, onBasculerTheme }) {
  const [survoleConnexion, setSurvoleConnexion] = React.useState(false);
  const [survoleCarte, setSurvoleCarte] = React.useState(false);

  const styles = {
    body: {
      background: mode === 'dark'
        ? 'radial-gradient(circle at top left, #17366d 0%, #0b1532 35%, #06111f 100%)'
        : '#edf2f7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      margin: 0,
    },
    themeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: mode === 'dark' ? '#2d2d2d' : 'rgba(0,0,0,0.1)',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: mode === 'dark' ? '#fff' : '#061f56',
      fontSize: '24px',
      transition: '0.3s',
    },
    mainContainer: {
      width: '1100px',
      maxWidth: '100%',
      background: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(5, 15, 35, 0.96) 0%, rgba(9, 25, 52, 0.92) 100%)'
        : '#fff',
      borderRadius: '22px',
      overflow: 'hidden',
      display: 'flex',
      boxShadow: '0 15px 40px rgba(0,0,0,.25)',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
      border: survoleCarte
        ? '1px solid transparent'
        : mode === 'dark'
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(0,0,0,0.08)',
      backdropFilter: 'blur(16px)',
      transition: 'all 0.25s ease',
      animation: 'fadeSlideIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
    },
    left: {
      width: window.innerWidth <= 768 ? '100%' : '40%',
      background: mode === 'dark'
        ? 'linear-gradient(135deg, #061b44 0%, #0b2a5f 100%)'
        : '#061f56',
      color: '#fff',
      padding: window.innerWidth <= 768 ? '40px 30px' : '60px 45px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      animation: 'slideInLeft 0.8s ease-out 0.2s both',
    },
    logo: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '60px',
    },
    leftH1: {
      fontSize: window.innerWidth <= 768 ? '36px' : '52px',
      lineHeight: 1.2,
      marginBottom: '25px',
      margin: '0 0 25px 0',
    },
    logoBadge: {
      width: '90px',
      height: '90px',
      borderRadius: '24px',
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
      border: '1px solid rgba(255,255,255,0.2)',
      animation: 'logoEntrance 2.5s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both',
      willChange: 'transform, opacity',
    },
    logoImage: {
      width: '56px',
      height: '56px',
      objectFit: 'contain',
      borderRadius: '14px',
    },
    leftP: {
      color: '#d7d7d7',
      lineHeight: 1.7,
      margin: 0,
    },
    community: {
      marginTop: '50px',
      background: 'rgba(255,255,255,.1)',
      padding: '18px',
      borderRadius: '12px',
    },
    right: {
      width: window.innerWidth <= 768 ? '100%' : '60%',
      padding: window.innerWidth <= 768 ? '40px 30px' : '60px',
      background: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(7, 16, 34, 0.96) 0%, rgba(10, 24, 44, 0.95) 100%)'
        : '#fff',
      borderLeft: mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
      animation: 'slideInRight 0.8s ease-out 0.3s both',
    },
    rightH2: {
      fontSize: window.innerWidth <= 768 ? '32px' : '45px',
      marginBottom: '8px',
      margin: '0 0 8px 0',
      color: mode === 'dark' ? '#fff' : '#000',
    },
    subtitle: {
      color: mode === 'dark' ? '#aaa' : '#777',
      marginBottom: '35px',
    },
    tabs: {
      display: 'flex',
      background: mode === 'dark' ? '#2d2d2d' : '#f2f2f2',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '30px',
    },
    tabButton: {
      flex: 1,
      padding: '15px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: 'transparent',
      color: mode === 'dark' ? '#ccc' : '#333',
    },
    tabButtonActive: {
      background: '#061f56',
      color: '#fff',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      marginTop: '20px',
      fontWeight: 'bold',
      color: mode === 'dark' ? '#ccc' : '#333',
    },
    adminBadge: {
      display: 'inline-block',
      background: '#061f56',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginBottom: '20px',
      marginTop: '20px',
    },
    headerSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    inputGroup: {
      marginBottom: '30px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: `1px solid ${mode === 'dark' ? '#444' : '#ddd'}`,
      borderRadius: '10px',
      fontSize: '16px',
      background: mode === 'dark' ? '#2d2d2d' : '#f9f9f9',
      color: mode === 'dark' ? '#fff' : '#000',
      boxSizing: 'border-box',
    },
    forgot: {
      display: 'block',
      textAlign: 'right',
      margin: '18px 0 30px',
      color: '#061f56',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    login: {
      width: '100%',
      padding: '17px',
      border: 'none',
      borderRadius: '10px',
      background: '#061f56',
      color: 'white',
      fontSize: '18px',
      cursor: 'pointer',
      transition: '0.3s',
    },
    loginHover: {
      background: '#0b327d',
    },
    signup: {
      textAlign: 'center',
      marginTop: '25px',
      color: mode === 'dark' ? '#ccc' : '#333',
    },
    signupLink: {
      textDecoration: 'none',
      color: '#061f56',
      fontWeight: 'bold',
    },
    erreur: {
      color: '#dc2626',
      marginBottom: '1rem',
      fontWeight: 600,
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-28px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(28px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes logoEntrance {
          0% { opacity: 0; transform: translateY(140px) scale(0.7); }
          60% { opacity: 1; transform: translateY(-8px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div style={styles.body}>
        <div
          style={styles.mainContainer}
          onMouseEnter={() => setSurvoleCarte(true)}
          onMouseLeave={() => setSurvoleCarte(false)}
        >
          <div style={styles.left}>
            <div style={styles.logoBadge}>
              <img src="/Storage Manager.png" alt="Storage Manager logo" style={styles.logoImage} />
            </div>
            <h1 style={styles.leftH1}>Storage Manager</h1>
          </div>

          <div style={styles.right}>
            <div style={styles.headerSection}>
              <h2 style={styles.rightH2}>Connexion</h2>
              <button
                onClick={onBasculerTheme}
                style={{ ...styles.themeButton, position: 'relative', width: '45px', height: '45px', top: 'auto', right: 'auto', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Basculer le mode clair/sombre"
              >
                {mode === 'dark' ? (
                  <Brightness7Icon sx={{ fontSize: '28px', color: '#fff' }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: '28px', color: '#061f56' }} />
                )}
              </button>
            </div>
            <p style={styles.subtitle}>Entrez vos identifiants pour continuer</p>

            <div style={{
              width: '100%',
              padding: '5px',
              borderRadius: '10px',
              background: '#061f56',
              color: 'white',
              fontSize: '18px',
              marginBottom: '30px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              Admin
            </div>

            <form onSubmit={onSubmit}>

              <label style={styles.label}>E-mail</label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={courriel}
                onChange={onCourrielChange}
                style={styles.input}
              />

              <label style={{ ...styles.label, marginTop: '30px' }}>Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={motDePasse}
                onChange={onMotDePasseChange}
                style={{ ...styles.input, letterSpacing: '4px' }}
              />

              {erreur && <p style={styles.erreur}>{erreur}</p>}
              <button
                type="submit"
                style={{
                  ...styles.login,
                  marginTop: '25px',
                  ...(survoleConnexion ? styles.loginHover : {}),
                }}
                onMouseEnter={() => setSurvoleConnexion(true)}
                onMouseLeave={() => setSurvoleConnexion(false)}
              >
                Se connecter →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function ContenuApp() {
  const { mode, basculerTheme } = useTheme();
  const muiTheme = getTheme(mode);
  const [ouvertMobile, setOuvertMobile] = useState(false);
  const [ouvertTiroir, setOuvertTiroir] = useState(false);
  const [pageActuelle, setPageActuelle] = useState('monitoring');
  const [estAdminConnecte, setEstAdminConnecte] = useState(false);
  const [erreurConnexion, setErreurConnexion] = useState('');
  const [courriel, setCourriel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [disques, setDisques] = useState([
    {
      id: '1',
      name: 'SSD Principal',
      total: 1000,
      used: 720,
      free: 280,
      percentage: 72,
      type: 'SSD',
      status: 'healthy',
    },
    {
      id: '2',
      name: 'HDD Stockage',
      total: 2000,
      used: 1650,
      free: 350,
      percentage: 82.5,
      type: 'HDD',
      status: 'warning',
    },
    {
      id: '3',
      name: 'Disque Sauvegarde',
      total: 4000,
      used: 3900,
      free: 100,
      percentage: 97.5,
      type: 'HDD',
      status: 'critical',
    },
    {
      id: '4',
      name: 'Cache SSD',
      total: 500,
      used: 185,
      free: 315,
      percentage: 37,
      type: 'SSD',
      status: 'healthy',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisques(prevDisks =>
        prevDisks.map(disk => ({
          ...disk,
          used: Math.max(0, Math.min(disk.total, disk.used + (Math.random() - 0.5) * 50)),
          percentage: Math.round(((disk.used + (Math.random() - 0.5) * 50) / disk.total) * 100 * 10) / 10,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const basculerTiroir = () => {
    setOuvertMobile(!ouvertMobile);
  };

  const sourisEntreeTiroir = () => {
    setOuvertTiroir(true);
  };

  const sourisQuitteTiroir = () => {
    setOuvertTiroir(false);
  };

  const soumettreConnexion = (event) => {
    event.preventDefault();
    const courrielAdmin = 'hachejoven@gmail.com';
    const motDePasseAdmin = 'PROJETREACT';

    if (courriel.trim().toLowerCase() === courrielAdmin && motDePasse === motDePasseAdmin) {
      setEstAdminConnecte(true);
      setErreurConnexion('');
    } else {
      setErreurConnexion('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  const deconnecter = () => {
    setEstAdminConnecte(false);
    setCourriel('');
    setMotDePasse('');
    setErreurConnexion('');
    setPageActuelle('monitoring');
    setOuvertMobile(false);
  };

  const elementsMenu = [
    { id: 'monitoring', label: 'Surveillance', icon: <DashboardIcon /> },
    { id: 'overview', label: 'Vue Globale', icon: <TrendingUpIcon /> },
    { id: 'disques', label: 'Disques Durs', icon: <SdStorageIcon /> },
  ];

  const contenuTiroir = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{
        p: 2.5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(76, 175, 80, 0.05) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: ouvertTiroir ? 'space-between' : 'center',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: ouvertTiroir ? 1.5 : 0 }}>
          <StorageIcon sx={{ fontSize: '1.7rem' }} />
          {ouvertTiroir && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: (theme) => theme.palette.primary.main }}>
                Monitoring
              </Typography>
              <Typography variant="caption" sx={{ color: (theme) => theme.palette.text.secondary, mt: 0.5 }}>
                Stockage en Temps Réel
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <List sx={{ flex: 1, py: 2 }}>
        {elementsMenu.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => {
              setPageActuelle(item.id);
              setOuvertMobile(false);
            }}
            sx={{
              mx: ouvertTiroir ? 1 : 0,
              mb: 1,
              borderRadius: '12px',
              justifyContent: ouvertTiroir ? 'flex-start' : 'center',
              backgroundColor: pageActuelle === item.id ? (theme) => `${theme.palette.primary.main}15` : 'transparent',
              borderLeft: pageActuelle === item.id && ouvertTiroir ? (theme) => `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
              color: pageActuelle === item.id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: (theme) => `${theme.palette.primary.main}10`,
              },
              transition: 'all 0.2s ease',
              px: ouvertTiroir ? 2 : 0,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: ouvertTiroir ? 2 : 0,
                justifyContent: 'center',
                color: pageActuelle === item.id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            {ouvertTiroir && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: 'auto',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          p: ouvertTiroir ? 1.5 : 1,
        }}
      >
        <ListItem
          button
          onClick={deconnecter}
          sx={{
            borderRadius: '12px',
            justifyContent: ouvertTiroir ? 'flex-start' : 'center',
            color: (theme) => theme.palette.error.main,
            '&:hover': {
              backgroundColor: (theme) => `${theme.palette.error.main}12`,
            },
            px: ouvertTiroir ? 2 : 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: ouvertTiroir ? 2 : 0,
              justifyContent: 'center',
              color: (theme) => theme.palette.error.main,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          {ouvertTiroir && <ListItemText primary="Déconnexion" />}
        </ListItem>
      </Box>
    </Box>
  );

  if (!estAdminConnecte) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <PageConnexion
          courriel={courriel}
          motDePasse={motDePasse}
          erreur={erreurConnexion}
          mode={mode}
          onCourrielChange={(event) => setCourriel(event.target.value)}
          onMotDePasseChange={(event) => setMotDePasse(event.target.value)}
          onBasculerTheme={basculerTheme}
          onSubmit={soumettreConnexion}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar
          component="header"
          position="fixed"
          color="inherit"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: { md: `calc(100% - ${ouvertTiroir ? LARGEUR_TIROIR : LARGEUR_MINI_TIROIR}px)` },
            ml: { md: `${ouvertTiroir ? LARGEUR_TIROIR : LARGEUR_MINI_TIROIR}px` },
            backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(18, 18, 18, 0.92)',
            color: mode === 'light' ? '#000000' : '#ffffff',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={basculerTiroir}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: mode === 'light' ? '#000000' : '#ffffff' }}>
                Storage Manager
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              onClick={basculerTheme}
              title="Basculer le mode clair/sombre"
              sx={{
                color: mode === 'light' ? '#000000' : '#ffffff',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(20deg)' },
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={ouvertMobile}
          onClose={basculerTiroir}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: LARGEUR_TIROIR,
            },
          }}
        >
          {contenuTiroir}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          onMouseEnter={sourisEntreeTiroir}
          onMouseLeave={sourisQuitteTiroir}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: ouvertTiroir ? LARGEUR_TIROIR : LARGEUR_MINI_TIROIR,
              top: 0,
              height: '100vh',
              overflowX: 'hidden',
              transition: 'width 0.25s ease',
            },
          }}
        >
          {contenuTiroir}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            minHeight: '100vh',
            ml: { md: `${ouvertTiroir ? LARGEUR_TIROIR : LARGEUR_MINI_TIROIR}px` },
            backgroundColor: (theme) => theme.palette.background.default,
            transition: 'margin-left 0.25s ease',
          }}
        >
          <Container maxWidth="xl">
            {pageActuelle === 'monitoring' && <SurveillanceDisque disques={disques} />}
            {pageActuelle === 'overview' && <VueGlobale disques={disques} />}
            {pageActuelle === 'disques' && <DisquesDurs disques={disques} />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <CustomThemeProvider>
      <ContenuApp />
    </CustomThemeProvider>
  );
}
