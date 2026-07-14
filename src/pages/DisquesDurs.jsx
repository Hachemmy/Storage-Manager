import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Grow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DisquesDurs({ disques }) {
  const muiTheme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredDisks = useMemo(() => {
    let result = disques;

    if (searchTerm) {
      result = result.filter(disk =>
        disk.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      result = result.filter(disk => disk.type === filterType);
    }

    if (filterStatus !== 'all') {
      result = result.filter(disk => disk.status === filterStatus);
    }

    return result;
  }, [disques, searchTerm, filterType, filterStatus]);

  const sortedDisks = useMemo(() => {
    const sorted = [...filteredDisks];
    sorted.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    return sorted;
  }, [filteredDisks, sortBy, sortOrder]);

  const donneesGraphique = sortedDisks.map(disk => ({
    name: disk.name.substring(0, 10),
    'Utilisé (%)': disk.percentage,
    'Libre (%)': 100 - disk.percentage,
  }));

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleOpenDialog = (disk) => {
    setSelectedDisk(disk);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDisk(null);
  };

  const handleExportCSV = () => {
    const headers = ['Nom', 'Type', 'Capacité (TB)', 'Utilisé (TB)', 'Libre (TB)', 'Utilisation (%)', 'Statut'];
    const rows = sortedDisks.map(disk => [
      disk.name,
      disk.type,
      (disk.total / 1024).toFixed(2),
      (disk.used / 1024).toFixed(2),
      (disk.free / 1024).toFixed(2),
      disk.percentage.toFixed(1),
      disk.status,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'disques_durs.csv');
    link.click();
  };

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
        return <CheckCircleIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'critical':
        return <ErrorIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
          Disques Durs
        </Typography>
        <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>
          Gestion détaillée et monitoring de chaque disque
        </Typography>
      </Box>

      {/* Disk Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {disques.map((disk, index) => (
          <Grid item xs={12} sm={6} md={3} key={disk.id}>
            <Grow in={true} timeout={500 + index * 100}>
              <Card
                onClick={() => handleOpenDialog(disk)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  background: muiTheme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)`
                    : `linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(76, 175, 80, 0.05) 100%)`,
                  border: `2px solid ${obtenirCouleurStatut(disk.status)}20`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: obtenirCouleurStatut(disk.status),
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {disk.name}
                    </Typography>
                    <Chip
                      label={disk.type}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: muiTheme.palette.primary.main,
                        color: 'white',
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>
                        Utilisation
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: obtenirCouleurStatut(disk.status) }}>
                        {disk.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={disk.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${obtenirCouleurStatut(disk.status)} 0%, ${obtenirCouleurStatut(disk.status)}dd 100%)`,
                        },
                      }}
                    />
                  </Box>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Capacité :</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{(disk.total / 1024).toFixed(2)} TB</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Utilisé :</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{(disk.used / 1024).toFixed(2)} TB</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Libre :</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#4caf50' }}>{(disk.free / 1024).toFixed(2)} TB</Typography>
                    </Box>
                  </Stack>

                  <Chip
                    icon={obtenirIconeStatut(disk.status)}
                    label={obtenirEtiquetteStatut(disk.status)}
                    sx={{
                      backgroundColor: obtenirCouleurStatut(disk.status),
                      color: 'white',
                      fontWeight: 600,
                      mt: 2,
                      width: '100%',
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Filters and Search */}
      <Grow in={true} timeout={700}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Rechercher un disque"
                  placeholder="Entrez le nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: muiTheme.palette.text.secondary }} />,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ToggleButtonGroup
                  value={filterType}
                  exclusive
                  onChange={(e, newType) => newType && setFilterType(newType)}
                  fullWidth
                >
                  <ToggleButton value="all" sx={{ fontSize: '0.875rem' }}>Tous</ToggleButton>
                  <ToggleButton value="SSD" sx={{ fontSize: '0.875rem' }}>SSD</ToggleButton>
                  <ToggleButton value="HDD" sx={{ fontSize: '0.875rem' }}>HDD</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ToggleButtonGroup
                  value={filterStatus}
                  exclusive
                  onChange={(e, newStatus) => newStatus && setFilterStatus(newStatus)}
                  fullWidth
                >
                  <ToggleButton value="all" sx={{ fontSize: '0.75rem' }}>État</ToggleButton>
                  <ToggleButton value="healthy" sx={{ fontSize: '0.75rem' }}>Sain</ToggleButton>
                  <ToggleButton value="warning" sx={{ fontSize: '0.75rem' }}>⚠️</ToggleButton>
                  <ToggleButton value="critical" sx={{ fontSize: '0.75rem' }}>🔴</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportCSV}
                  sx={{ borderRadius: '8px' }}
                >
                  Exporter
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grow>

      {/* Chart */}
      <Grow in={true} timeout={800}>
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
      <Grow in={true} timeout={900}>
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, p: 2 }}>
              Tableau Détaillé ({sortedDisks.length} disques)
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 247, 250, 0.8)' }}>
                    <TableCell sortDirection={sortBy === 'name' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'name'}
                        direction={sortOrder}
                        onClick={() => handleSort('name')}
                      >
                        Nom
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === 'type' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'type'}
                        direction={sortOrder}
                        onClick={() => handleSort('type')}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === 'total' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'total'}
                        direction={sortOrder}
                        onClick={() => handleSort('total')}
                      >
                        Capacité
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === 'used' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'used'}
                        direction={sortOrder}
                        onClick={() => handleSort('used')}
                      >
                        Utilisé
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === 'pourcentage' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'pourcentage'}
                        direction={sortOrder}
                        onClick={() => handleSort('pourcentage')}
                      >
                        Utilisation
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">Statut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedDisks.map((disk) => (
                    <TableRow
                      key={disk.id}
                      hover
                      onClick={() => handleOpenDialog(disk)}
                      sx={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>{disk.name}</TableCell>
                      <TableCell align="right">{disk.type}</TableCell>
                      <TableCell align="right">{(disk.total / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">{(disk.used / 1024).toFixed(2)} TB</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          <LinearProgress
                            variant="determinate"
                            value={disk.percentage}
                            sx={{
                              width: '100px',
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${obtenirCouleurStatut(disk.status)} 0%, ${obtenirCouleurStatut(disk.status)}dd 100%)`,
                              },
                            }}
                          />
                          <Typography sx={{ fontWeight: 600, minWidth: '50px', textAlign: 'right' }}>
                            {disk.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={obtenirIconeStatut(disk.status)}
                          label={obtenirEtiquetteStatut(disk.status)}
                          size="small"
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

      {/* Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.3rem' }}>
          Détails du Disque
        </DialogTitle>
        <DialogContent dividers>
          {selectedDisk && (
            <Stack spacing={2} sx={{ pt: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Nom</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedDisk.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Type</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedDisk.type}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Capacité Totale</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{(selectedDisk.total / 1024).toFixed(2)} TB</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Espace Utilisé</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{(selectedDisk.used / 1024).toFixed(2)} TB</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Espace Libre</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#4caf50' }}>{(selectedDisk.free / 1024).toFixed(2)} TB</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>Pourcentage d&apos;Utilisation</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={selectedDisk.percentage}
                    sx={{
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${obtenirCouleurStatut(selectedDisk.status)} 0%, ${obtenirCouleurStatut(selectedDisk.status)}dd 100%)`,
                      },
                    }}
                  />
                  <Typography sx={{ fontWeight: 600, minWidth: '50px' }}>
                    {selectedDisk.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>État</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    icon={obtenirIconeStatut(selectedDisk.status)}
                    label={obtenirEtiquetteStatut(selectedDisk.status)}
                    sx={{
                      backgroundColor: obtenirCouleurStatut(selectedDisk.status),
                      color: 'white',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
