import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Tooltip,
  Paper,
  Grow,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StorageIcon from '@mui/icons-material/Storage';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const obtenirCouleurStatut = (status) => {
  switch (status) {
    case 'healthy':
      return '#4caf50';
    case 'warning':
      return '#ff9800';
    case 'critical':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

const obtenirCouleurDisque = (disk) => {
  if (disk?.name === 'Cache SSD') {
    return '#87CEEB';
  }

  return obtenirCouleurStatut(disk?.status);
};

const obtenirEtiquetteStatut = (status) => {
  switch (status) {
    case 'healthy':
      return 'Sain';
    case 'warning':
      return 'Attention';
    case 'critical':
      return 'Critique';
    default:
      return 'Inconnu';
  }
};

const obtenirIconeStatut = (status) => {
  switch (status) {
    case 'healthy':
      return <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />;
    case 'warning':
      return <WarningIcon sx={{ fontSize: '1.2rem' }} />;
    case 'critical':
      return <ErrorIcon sx={{ fontSize: '1.2rem' }} />;
    default:
      return <StorageIcon sx={{ fontSize: '1.2rem' }} />;
  }
};

export default function SurveillanceDisque({ disques }) {
  const muiTheme = useTheme();
  const [enActualisatio, setEnActualisation] = useState(false);

  const actualiser = () => {
    setEnActualisation(true);
    setTimeout(() => setEnActualisation(false), 500);
  };

  const capaciteTotale = disques.reduce((sum, disk) => sum + disk.total, 0);
  const totalUtilise = disques.reduce((sum, disk) => sum + disk.used, 0);
  const totalLibre = disques.reduce((sum, disk) => sum + disk.free, 0);
  const pourcentageGlobal = Math.round((totalUtilise / capaciteTotale) * 100);

  const donneesCamembert = disques.map(disk => ({
    name: disk.name,
    value: disk.used,
  }));

  const donneesGraphique = disques.map(disk => ({
    name: disk.name,
    'Utilisé (%)': disk.percentage,
    'Libre (%)': 100 - disk.percentage,
  }));

  const donneesTemps = [
    { time: '00:00', usage: 45 },
    { time: '04:00', usage: 52 },
    { time: '08:00', usage: 68 },
    { time: '12:00', usage: 72 },
    { time: '16:00', usage: 78 },
    { time: '20:00', usage: 82 },
    { time: '24:00', usage: 75 },
  ];

  const kpiCards = [
    {
      title: 'Capacité Totale',
      value: `${(capaciteTotale / 1024).toFixed(1)} TB`,
      icon: <StorageIcon sx={{ fontSize: '2.5rem', color: muiTheme.palette.primary.main }} />,
      color: muiTheme.palette.primary.main,
      delay: 0,
    },
    {
      title: 'Espace Utilisé',
      value: `${(totalUtilise / 1024).toFixed(1)} TB`,
      icon: <TrendingUpIcon sx={{ fontSize: '2.5rem', color: '#ff9800' }} />,
      color: '#ff9800',
      delay: 100,
    },
    {
      title: 'Espace Libre',
      value: `${(totalLibre / 1024).toFixed(1)} TB`,
      icon: <CheckCircleIcon sx={{ fontSize: '2.5rem', color: '#4caf50' }} />,
      color: '#4caf50',
      delay: 200,
    },
    {
      title: 'Utilisation Moyenne',
      value: `${pourcentageGlobal}%`,
      icon: <WarningIcon sx={{ fontSize: '2.5rem', color: pourcentageGlobal > 80 ? '#f44336' : '#ff9800' }} />,
      color: pourcentageGlobal > 80 ? '#f44336' : '#ff9800',
      delay: 300,
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Tableau de Bord
          </Typography>
          <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>
            État en temps réel de vos disques durs
          </Typography>
        </Box>
        <Tooltip title="Rafraîchir les données">
          <Button
            variant="contained"
            startIcon={enActualisatio ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
            onClick={actualiser}
            disabled={enActualisatio}
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Rafraîchir
          </Button>
        </Tooltip>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Grow in={true} timeout={500 + card.delay}>
              <Card
                sx={{
                  height: '100%',
                  background: muiTheme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)`
                    : `linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(76, 175, 80, 0.05) 100%)`,
                  border: `2px solid ${card.color}20`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${card.color} 0%, ${card.color}00 100%)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box sx={{ opacity: 0.7 }}>
                      {card.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Grow in={true} timeout={800}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Distribution d&apos;Utilisation
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={donneesCamembert}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {disques.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={obtenirCouleurDisque(entry)} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `${(value / 1024).toFixed(1)} TB`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        {/* Area Chart */}
        <Grid item xs={12} md={6}>
          <Grow in={true} timeout={900}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Tendance d&apos;Utilisation
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={donneesTemps}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="usage" stroke="#1e88e5" fill="#1e88e5" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>

      {/* Bar Chart */}
      <Grow in={true} timeout={1000}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Comparaison des Disques
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donneesGraphique}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Utilisé (%)" fill="#1e88e5" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Libre (%)" fill="#4caf50" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grow>

      {/* Details Table */}
      <Grow in={true} timeout={1100}>
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, p: 2 }}>
              Détails des Disques
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 247, 250, 0.8)' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Disque</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Utilisé</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Libre</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Utilisation</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Statut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disques.map((disk) => (
                    <TableRow key={disk.id} hover sx={{ transition: 'all 0.2s ease' }}>
                      <TableCell sx={{ fontWeight: 600 }}>{disk.name}</TableCell>
                      <TableCell align="right">{disk.type}</TableCell>
                      <TableCell align="right">{(disk.total / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">{(disk.used / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">{(disk.free / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={disk.pourcentage}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${obtenirCouleurStatut(disk.status)} 0%, ${obtenirCouleurStatut(disk.status)}dd 100%)`,
                                borderRadius: 4,
                              },
                            }}
                          />
                          <Typography sx={{ fontWeight: 600, minWidth: '45px', textAlign: 'right' }}>
                            {disk.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={obtenirIconeStatut(disk.status)}
                          label={obtenirEtiquetteStatut(disk.status)}
                          sx={{
                            backgroundColor: obtenirCouleurStatut(disk.status),
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiChip-icon': {
                              color: 'white',
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grow>
    </Box>
  );
}
