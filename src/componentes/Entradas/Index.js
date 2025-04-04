import React, { useEffect, useState } from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  IconButton,
  CircularProgress,
  Box,
  Chip,
  Paper,
  Stack,
  Avatar,
  Skeleton,
  Divider,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../Index/NavBar";
import { getEntradas, getCategorias } from "../../servicios/blogServicios";
import { getAutores } from "../../servicios/cuentaServicios";
import CrearDrawer from "./CrearDrawer";
import EditarDrawer from "./EditarDrawer";
import { 
  EditOutlined, 
  AddOutlined, 
  CalendarTodayOutlined, 
  PersonOutlined,
  ArticleOutlined,
  CategoryOutlined
} from "@mui/icons-material";
import apiURL from "../../UrlBackend";

const EntradasList = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [drawerCrearOpen, setDrawerCrearOpen] = useState(false);
  const [drawerEditOpen, setDrawerEditOpen] = useState(false);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [entradasRes, categoriasRes, autoresRes] = await Promise.all([
        getEntradas(),
        getCategorias(),
        getAutores()
      ]);
      setEntradas(entradasRes);
      setCategorias(categoriasRes);
      setAutores(autoresRes);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error al cargar los datos. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (entrada) => {
    setEntradaSeleccionada(entrada);
    setDrawerEditOpen(true);
  };

  const getAutorName = (id) => {
    const autor = autores.find(a => a.id === id);
    return autor ? `${autor.first_name} ${autor.last_name}` : 'Autor desconocido';
  };

  const getCategoriaName = (id) => {
    const categoria = categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 6,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight="700"
              sx={{ 
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              Gestión de Entradas
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <ArticleOutlined fontSize="small" />
              {entradas.length} {entradas.length === 1 ? 'entrada' : 'entradas'} registradas
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            startIcon={<AddOutlined />}
            onClick={() => setDrawerCrearOpen(true)}
            sx={{ 
              height: '48px',
              px: 4,
              borderRadius: '12px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Nueva Entrada
          </Button>
        </Box>

        {/* Error State */}
        {error && (
          <Paper elevation={0} sx={{ 
            p: 3, 
            mb: 4, 
            backgroundColor: theme.palette.error.light,
            borderRadius: '12px'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="error">{error}</Typography>
              <Button 
                onClick={fetchData} 
                variant="outlined" 
                color="error"
                sx={{ ml: 2 }}
              >
                Reintentar
              </Button>
            </Box>
          </Paper>
        )}

        {/* Loading State */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={32} />
                    <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                      <Skeleton variant="circular" width={24} height={24} />
                      <Skeleton variant="text" width="60%" />
                    </Box>
                    <Skeleton variant="text" width="40%" />
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="text" height={72} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Skeleton variant="rectangular" width={100} height={36} />
                      <Skeleton variant="circular" width={36} height={36} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Content Section */
          <Grid container spacing={3}>
            {entradas.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ 
                  p: 6, 
                  textAlign: 'center',
                  borderRadius: '12px',
                  backgroundColor: theme.palette.background.paper
                }}>
                  <Box sx={{ 
                    width: 120, 
                    height: 120, 
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <ArticleOutlined sx={{ fontSize: 48, color: theme.palette.text.secondary }} />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    No hay entradas registradas
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '500px', mx: 'auto' }}>
                    Comienza creando tu primera entrada para compartir contenido con tu audiencia.
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddOutlined />}
                    onClick={() => setDrawerCrearOpen(true)}
                    sx={{ px: 4, borderRadius: '12px' }}
                  >
                    Crear primera entrada
                  </Button>
                </Paper>
              </Grid>
            ) : (
              entradas.map((entrada) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={entrada.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}>
                    {/* Image Section */}
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`${apiURL}${entrada.imagen}`}
                        alt={entrada.titulo}
                        sx={{ 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconButton
                          aria-label="editar"
                          onClick={() => handleEditar(entrada)}
                          sx={{ color: 'white' }}
                        >
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Content Section */}
                    <CardContent sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      backgroundColor: theme.palette.background.paper
                    }}>
                      {/* Title */}
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        fontWeight="600"
                        sx={{ 
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '64px'
                        }}
                      >
                        {entrada.titulo}
                      </Typography>

                      {/* Metadata */}
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          icon={<PersonOutlined fontSize="small" />} 
                          label={getAutorName(entrada.autor)} 
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderRadius: '6px',
                            backgroundColor: theme.palette.action.hover
                          }}
                        />
                        <Chip 
                          icon={<CalendarTodayOutlined fontSize="small" />} 
                          label={new Date(entrada.fecha_publicacion).toLocaleDateString()} 
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderRadius: '6px',
                            backgroundColor: theme.palette.action.hover
                          }}
                        />
                      </Stack>

                      {/* Category */}
                      {entrada.categoria && (
                        <Chip 
                          icon={<CategoryOutlined fontSize="small" />}
                          label={getCategoriaName(entrada.categoria)} 
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            mb: 2,
                            borderRadius: '6px',
                            alignSelf: 'flex-start'
                          }}
                        />
                      )}

                      {/* Summary */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 3,
                          flexGrow: 1
                        }}
                      >
                        {entrada.resumen || 'No hay descripción disponible'}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      {/* Actions */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Button
                          component={Link}
                          to={`/entradas/${entrada.slug}`}
                          variant="text"
                          color="primary"
                          size="small"
                          sx={{ 
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            px: 2
                          }}
                        >
                          Ver detalles
                        </Button>
                        
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.main
                          }}
                        >
                          {getAutorName(entrada.autor).charAt(0)}
                        </Avatar>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>

      {/* Drawers */}
      <CrearDrawer 
        open={drawerCrearOpen} 
        onClose={() => setDrawerCrearOpen(false)} 
        listaEntradas={fetchData}
        listaCategorias={categorias}
        listaAutores={autores}
      />

      <EditarDrawer 
        entradaId={entradaSeleccionada}
        open={drawerEditOpen} 
        onClose={() => setDrawerEditOpen(false)} 
        listaEntradas={fetchData}
        listaCategorias={categorias}
        listaAutores={autores}
      />
    </Box>
  );
};

export default EntradasList;