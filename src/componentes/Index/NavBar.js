import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { logoutUser } from "../../servicios/cuentaServicios";

const NavBar = () => {

    const token = localStorage.getItem('token');

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            MiBlog
                        </Link>
                    </Typography>
                    <Box>
                        {token ? (
                            <>
                            <Button color="inherit" component={Link} to="/entradas">
                                Entradas
                            </Button>
                            <Button color="inherit" component={Link} to="/categorias">
                                Categorias
                            </Button>
                            <Button color="inherit" onClick={logoutUser}>
                                Cerrar sesión
                            </Button>
                            </>
                        ) : (
                            <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            </>

                        )}
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    )
};

export default NavBar;