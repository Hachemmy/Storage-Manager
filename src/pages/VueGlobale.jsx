import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grow,
  Stack,
  Alert,
  AlertTitle,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';



const getAlertIcon = (status) => {
  switch (status) {
    case 'healthy':
      return <CheckCircleIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'critical':
      return <ErrorIcon />;
    default:
      return <InfoIcon />;
  }
};

export default function VueGlobale({ disques }) {
  const muiTheme = useTheme();

  const capaciteTotale = disques.reduce((sum, disk) => sum + disk.total, 0);
  const totalUtilise = disques.reduce((sum, disk) => sum + disk.used, 0);
  const totalLibre = disques.reduce((sum, disk) => sum + disk.free, 0);
  const pourcentageGlobal = Math.round((totalUtilise / capaciteTotale) * 100);

  const criticalDisks = disques.filter(d => d.status === 'critical');
  const warningDisks = disques.filter(d => d.status === 'warning');
  const healthyDisks = disques.filter(d => d.status === 'healthy');

  const donneesTemps = [
    { time: '00:00', usage: 45 },
    { time: '04:00', usage: 52 },
    { time: '08:00', usage: 68 },
    { time: '12:00', usage: 72 },
    { time: '16:00', usage: 78 },
    { time: '20:00', usage: 82 },
    { time: '24:00', usage: 75 },
  ];

  const statCards = [
    {
      title: 'Total',
      value: disques.length,
      icon: <TrendingUpIcon sx={{ fontSize: '1.5rem' }} />,
      color: muiTheme.palette.primary.main,
      delay: 0,
    },
    {
      title: 'Sains',
      value: healthyDisks.length,
      icon: <CheckCircleIcon sx={{ fontSize: '1.5rem' }} />,
      color: '#4caf50',
      delay: 100,
    },
    {
      title: 'Attention',
      value: warningDisks.length,
      icon: <WarningIcon sx={{ fontSize: '1.5rem' }} />,
      color: '#ff9800',
      delay: 200,
    },
    {
      title: 'Critiques',
      value: criticalDisks.length,
      icon: <ErrorIcon sx={{ fontSize: '1.5rem' }} />,
      color: '#f44336',
      delay: 300,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
          Vue Globale
        </Typography>
        <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>
          Aperçu complet de votre infrastructure de stockage
        </Typography>
      </Box>

      {/* Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Grow in={true} timeout={500 + card.delay}>
              <Card sx={{ background: muiTheme.palette.mode === 'dark' ? `linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)` : `linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(76, 175, 80, 0.05) 100%)`, border: `2px solid ${card.color}20`, position: 'relative' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: card.color }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box sx={{ color: card.color, opacity: 0.7 }}>
                      {card.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Alerts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Grow in={true} timeout={800}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                État du Système
              </Typography>
              <Stack spacing={2}>
                {criticalDisks.map((disk) => (
                  <Alert
                    key={disk.id}
                    severity="erreur"
                    icon={getAlertIcon(disk.status)}
                    sx={{
                      borderRadius: '10px',
                      '& .MuiAlert-message': { width: '100%' },
                    }}
                  >
                    <AlertTitle sx={{ fontWeight: 700 }}>Critique - {disk.name}</AlertTitle>
                    L&apos;utilisation est à {disk.percentage.toFixed(1)}% ({(disk.used / 1024).toFixed(2)} TB / {(disk.total / 1024).toFixed(2)} TB). Action recommandée : libérer de l&apos;espace.
                  </Alert>
                ))}
                {warningDisks.map((disk) => (
                  <Alert
                    key={disk.id}
                    severity="warning"
                    icon={getAlertIcon(disk.status)}
                    sx={{
                      borderRadius: '10px',
                      '& .MuiAlert-message': { width: '100%' },
                    }}
                  >
                    <AlertTitle sx={{ fontWeight: 700 }}>Attention - {disk.name}</AlertTitle>
                    L&apos;utilisation approche du seuil critique ({disk.percentage.toFixed(1)}%). Conseil : surveiller la capacité restante.
                  </Alert>
                ))}
                {healthyDisks.length > 0 && (
                  <Alert
                    severity="success"
                    icon={getAlertIcon('healthy')}
                    sx={{
                      borderRadius: '10px',
                      '& .MuiAlert-message': { width: '100%' },
                    }}
                  >
                    <AlertTitle sx={{ fontWeight: 700 }}>{healthyDisks.length} disque(s) en bon état</AlertTitle>
                    {healthyDisks.map(d => `${d.name} (${d.percentage.toFixed(1)}%)`).join(', ')}
                  </Alert>
                )}
              </Stack>
            </Box>
          </Grow>
        </Grid>
      </Grid>

      {/* Trend Chart */}
      <Grow in={true} timeout={900}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Tendance Globale d&apos;Utilisation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donneesTemps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#1e88e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Utilisation (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grow>

      {/* Summary Table */}
      <Grow in={true} timeout={1000}>
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, p: 2 }}>
              Résumé des Disques
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 247, 250, 0.8)' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Nom</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Capacité</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Utilisé</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Utilisation</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Statut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disques.map((disk) => (
                    <TableRow key={disk.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{disk.name}</TableCell>
                      <TableCell align="right">{(disk.total / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">{(disk.used / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          <LinearProgress
                            variant="determinate"
                            value={disk.percentage}
                            sx={{
                              width: '60px',
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${disk.status === 'healthy' ? '#4caf50' : disk.status === 'warning' ? '#ff9800' : '#f44336'} 0%, ${disk.status === 'healthy' ? '#4caf50' : disk.status === 'warning' ? '#ff9800' : '#f44336'}dd 100%)`,
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
                          icon={getAlertIcon(disk.status)}
                          label={disk.status === 'healthy' ? 'Sain' : disk.status === 'warning' ? 'Attention' : 'Critique'}
                          size="small"
                          sx={{
                            backgroundColor: disk.status === 'healthy' ? '#4caf50' : disk.status === 'warning' ? '#ff9800' : '#f44336',
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
            <Box sx={{ p: 2, backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.5)' : 'rgba(245, 247, 250, 0.5)', borderTop: `1px solid ${muiTheme.palette.divider}` }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600 }}>Capacité Totale</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{(capaciteTotale / 1024).toFixed(2)} TB</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600 }}>Espace Utilisé</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{(totalUtilise / 1024).toFixed(2)} TB</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600 }}>Espace Libre</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{(totalLibre / 1024).toFixed(2)} TB</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box>
                    <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontWeight: 600 }}>Utilisation Moyenne</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: pourcentageGlobal > 80 ? '#f44336' : '#ff9800' }}>{pourcentageGlobal}%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    </Box>
  );
}
