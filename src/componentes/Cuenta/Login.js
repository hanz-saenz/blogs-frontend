import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Box, Alert } from "@mui/material";
import { loginUser } from "../../servicios/cuentaServicios";


const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const accionLogin = async (evento) => {
        evento.preventDefault();
        try {
            const respuestaUsuario = await loginUser({ username, password });

            if (respuestaUsuario.access) {
                localStorage.setItem('token', respuestaUsuario.access);
                setTimeout(() => {
                    navigate('/');
                }, 10000);
                
            }
        } catch (error) {
             setError('Error al iniciar sesión');
        }    
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box 
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4">Iniciar Sesión</Typography>
                    <Box
                        component="form"
                        onSubmit={accionLogin}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                        margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Usuario"
                            name="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <TextField
                        type="password"
                        margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Contraseña"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        {error && <Alert severity="error">{error}</Alert>}

                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                            }}
                        >
                            Ingresar
                        </Button>


                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login;