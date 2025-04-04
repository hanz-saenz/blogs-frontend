import React, { useEffect, useState } from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  IconButton,
  CircularProgress,
  Box,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../Index/NavBar";
import { getCategorias } from "../../servicios/blogServicios";
import CrearDrawer from "./CrearDrawer";
import EditarDrawer from "./EditarDrawer";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const CategoriasList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draweCrearOpen, setDraweCrearOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [draweEditOpen, setDraweEditOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();
      setCategorias(response);
      setError(null);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
      setError("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setDraweEditOpen(true);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Gestión de Categorías
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setDraweCrearOpen(true)}
          >
            Nueva Categoría
          </Button>
        </Box>

        {error && (
          <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'error.light' }}>
            <Typography color="error">{error}</Typography>
            <Button onClick={obtenerCategorias} sx={{ mt: 1 }}>
              Reintentar
            </Button>
          </Paper>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {categorias.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6">
                    No hay categorías registradas
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />}
                    onClick={() => setDraweCrearOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Crear primera categoría
                  </Button>
                </Paper>
              </Grid>
            ) : (
              categorias.map((categoria) => (
                <Grid item xs={12} sm={6} md={4} key={categoria.id}>
                  <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography variant="h6" component="h2" fontWeight="medium">
                          {categoria.nombre}
                        </Typography>
                        <IconButton
                          aria-label="editar"
                          color="primary"
                          onClick={() => handleEditar(categoria)}
                          sx={{ ml: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>

      <CrearDrawer 
        open={draweCrearOpen} 
        onClose={() => setDraweCrearOpen(false)} 
        listaCategorias={obtenerCategorias}
      />

      <EditarDrawer 
        categoriaId={categoriaSeleccionada}
        open={draweEditOpen} 
        onClose={() => setDraweEditOpen(false)} 
        listaCategorias={obtenerCategorias}
      />
    </>
  );
};

export default CategoriasList;