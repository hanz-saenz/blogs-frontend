import React, { useEffect, useState } from "react";
import NavBar from "../Index/NavBar";
import { getEntradas, getCategorias } from "../../servicios/blogServicios";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import apiURL from "../../UrlBackend";
import CrearDrawer from "./CrearDrawer";
import { getAutores } from "../../servicios/cuentaServicios";
import EditarDrawer from "./EditarDrawer";
import EditIcon from '@mui/icons-material/Edit';


const EntradasList = () => {

    const [entradas, setEntradas] = useState([])
    const [draweCrearOpen, setDraweCrearOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [autores, setAutores] = useState([]);

    const [draweEditOpen, setDraweEditOpen] = useState(false);
    const [entradaSeleccionada, setEntradaSeleccionada] = useState([]);

    const editarEntrada = (entrada) => {
        setEntradaSeleccionada(entrada);
        setDraweEditOpen(true);
    }

    const obtenerEntradas = async () => {
        const response = await getEntradas();
        setEntradas(response);
    }

    const obtenerCategorias= async () => {
        const response = await getCategorias();
        setCategorias(response);
    }

    const obtenerAutores= async () => {
        const response = await getAutores();
        setAutores(response);
    }

    useEffect(() => {
        obtenerEntradas();
        obtenerCategorias();
        obtenerAutores();
    }, [])


    return (
        <>
            <NavBar />
            <Container>
                <Button onClick={() => setDraweCrearOpen(true)}>Agregar Entrada</Button>
                <Typography>
                    Lista de entradas
                </Typography>
                <Grid container spacing={2}>

                    {entradas.map((entrada) => (
                        <>
                        <Grid key={entrada.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${apiURL}${entrada.imagen}`}
                                    alt="IMAGEN PREDETERMINADA"
                                />
                            </Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {entrada.titulo}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/entradas/${entrada.slug}`}
                                >
                                    Ver mas
                                </Button>
                                <IconButton
                                    aria-label="editar"
                                    color="primary"
                                    onClick={() => editarEntrada(entrada)}
                                >
                                    <EditIcon />

                                </IconButton>
                            </CardContent>
                        </Grid>         

                        </>
                    ))}
                </Grid>
            </Container>
            <CrearDrawer 
                    open={draweCrearOpen} 
                    onClose={() => setDraweCrearOpen(false)} 
                    listaEntradas={obtenerEntradas}
                    listaCategorias={categorias}
                    listaAutores={autores}
                    />

            <EditarDrawer 
                    entradaId={entradaSeleccionada}
                    open={draweEditOpen} 
                    onClose={() => setDraweEditOpen(false)} 
                    listaEntradas={obtenerEntradas}
                    listaCategorias={categorias}
                    listaAutores={autores}
                    />

            

        </>
    )
}

export default EntradasList;