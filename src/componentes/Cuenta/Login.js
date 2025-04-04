import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../../servicios/cuentaServicios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { username, password } = formData;
      
      if (!username.trim() || !password.trim()) {
        throw new Error('Todos los campos son requeridos');
      }

      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.access);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000);

      if (response?.access) {
        localStorage.setItem('token', response.access);
        navigate('/', { replace: true });
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.detail || error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Typography 
          component="h1" 
          variant="h4"
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Iniciar Sesión
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            value={formData.username}
            sx={{ mb: 2 }}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Ingresar'
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link 
              href="#" 
              variant="body2"
              onClick={() => navigate('/recuperar-contrasena')}
              sx={{ textDecoration: 'none' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;