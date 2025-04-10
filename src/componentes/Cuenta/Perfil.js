import React, { useEffect, useState } from "react";
import NavBar from "../Index/NavBar";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  Avatar,
  Box,
  CircularProgress
} from "@mui/material";

import { obtenerPerfil } from "../../servicios/cuentaServicios";
import axios from "axios";
import apiURL from "../../UrlBackend";

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    descripcion: '',
    es_autor: false,
    avatar: null,
    avatar_url: '',
    username: '',
    first_name: '',
    last_name: ''
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [editable, setEditable] = useState(false);

  const obtenerPerfilUsuario = async () => {
    try {
      const response = await obtenerPerfil();
      console.log('response', response);
      setPerfil(prev => ({
        ...prev,
        descripcion: response.descripcion,
        es_autor: response.es_autor,
        username: response.username,
        first_name: response.first_name,
        last_name: response.last_name,
        avatar_url: response.avatar
      }));
      setMensaje('Perfil cargado correctamente');
    } catch (error) {
      console.log('error', error);
      setError("Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const subirImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPerfil(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('descripcion', perfil.descripcion);
      formData.append('es_autor', perfil.es_autor);
      if (perfil.avatar) {
        formData.append('avatar', perfil.avatar);
      }

      const response = await axios.put(`${apiURL}/cuenta/perfil/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMensaje('Perfil actualizado correctamente');
    } catch (error) {
      console.log(error);
      setError("No se pudo actualizar el perfil");
    }

    
  };

  useEffect(() => {
    obtenerPerfilUsuario();
  }, []);

  return (
    <>
      <NavBar />

      <Box component="form" onSubmit={guardarCambios} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h5" gutterBottom>Perfil de Usuario</Typography>

        {mensaje && <Alert severity="success" sx={{ my: 2 }}>{mensaje}</Alert>}
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

        <Typography variant="subtitle1" gutterBottom>
          Nombre de Usuario: {perfil.username}
        </Typography>

        {perfil.avatar
          ? <Avatar src={URL.createObjectURL(perfil.avatar)} sx={{ width: 100, height: 100 }} />
          : perfil.avatar_url
            ? <Avatar src={`${apiURL}${perfil.avatar_url}`} sx={{ width: 100, height: 100 }} />
            : null
        }

        <TextField
          label="Descripción"
          name="descripcion"
          margin="normal"
          fullWidth
          value={perfil.descripcion}
          multiline
          rows={3}
          disabled={!editable}
          onChange={(e) =>
            setPerfil({
              ...perfil,
              descripcion: e.target.value
            })
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={perfil.es_autor}
              disabled={!editable}
              onChange={(e) =>
                setPerfil({
                  ...perfil,
                  es_autor: e.target.checked
                })
              }
            />
          }
          label="¿Eres autor?"
        />

        {editable && (
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Subir imagen
            <input type="file" name="avatar" hidden onChange={subirImagen} />
          </Button>
        )}

      {!editable ? ( 

        <Button 
          type="submit" variant="contained" fullWidth sx={{ mt: 3 }}
          onClick={() => setEditable(true)}>
          Editar
        </Button>

      ) : (

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Guardar
        </Button>

    )}
      </Box>
    </>
  );
};

export default Perfil;
