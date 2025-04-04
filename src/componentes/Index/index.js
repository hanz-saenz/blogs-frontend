import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  useTheme,
  Paper,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import {
  ArticleOutlined,
  CategoryOutlined,
  DashboardOutlined,
  LibraryBooksOutlined,
  AddOutlined
} from "@mui/icons-material";

const Index = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const features = [
    {
      title: "Entradas",
      description: "Administra todas las entradas del blog",
      icon: <ArticleOutlined fontSize="large" />,
      path: "/entradas",
      color: theme.palette.primary.main
    },
    {
      title: "Categorías",
      description: "Gestiona las categorías de contenido",
      icon: <CategoryOutlined fontSize="large" />,
      path: "/categorias",
      color: theme.palette.secondary.main
    },
    {
      title: "Contenido",
      description: "Explora todo el contenido publicado",
      icon: <LibraryBooksOutlined fontSize="large" />,
      path: "/entradas",
      color: theme.palette.success.main
    }
  ];

  const handleNavigation = (path) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <NavBar />
      
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 4 },
        py: 6
      }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <DashboardOutlined fontSize="large" />
            Panel de Administración
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Bienvenido al sistema de gestión de contenido. Selecciona una opción para comenzar.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  },
                  cursor: 'pointer'
                }}
                onClick={() => handleNavigation(feature.path)}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: `${feature.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: feature.color
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 'auto',
                      borderRadius: '8px',
                      borderWidth: '2px',
                      '&:hover': {
                        borderWidth: '2px'
                      }
                    }}
                  >
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Stats */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 8,
            p: 4,
            borderRadius: '12px',
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Accesos Rápidos
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ArticleOutlined />}
                sx={{
                  py: 2,
                  borderRadius: '8px',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
                onClick={() => handleNavigation("/entradas")}
              >
                Ver todas las entradas
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<CategoryOutlined />}
                sx={{
                  py: 2,
                  borderRadius: '8px',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
                onClick={() => handleNavigation("/categorias")}
              >
                Gestionar categorías
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddOutlined />}
                sx={{
                  py: 2,
                  borderRadius: '8px',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
                onClick={() => handleNavigation("/entradas")}
              >
                Crear nueva entrada
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddOutlined />}
                sx={{
                  py: 2,
                  borderRadius: '8px',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
                onClick={() => handleNavigation("/categorias")}
              >
                Añadir categoría
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="warning"
          sx={{ width: '100%' }}
        >
          Debes iniciar sesión para acceder a esta sección. Redirigiendo...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Index;