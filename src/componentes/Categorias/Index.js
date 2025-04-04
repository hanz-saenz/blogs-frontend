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


const CategoriasList = () => {

    const [entradas, setEntradas] = useState([])
    const [draweCrearOpen, setDraweCrearOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [autores, setAutores] = useState([]);

    const [draweEditOpen, setDraweEditOpen] = useState(false);
    const [categoriaSeleccionada, setcategoriaSeleccionada] = useState([]);

    const editarEntrada = (entrada) => {
        setcategoriaSeleccionada(entrada);
        setDraweEditOpen(true);
    }

    const obtenerCategorias= async () => {
        const response = await getCategorias();
        setCategorias(response);
    }


    useEffect(() => {
        obtenerCategorias();
    }, [])


    return (
        <>
            <NavBar />
            <Container>
                <Button onClick={() => setDraweCrearOpen(true)}>Agregar Categoria</Button>
                <Typography>
                    Lista de categorias
                </Typography>
                <Grid container spacing={2}>

                    {categorias.map((categoria) => (
                        <>
                        <Grid key={categoria.id}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {categoria.nombre}
                                    <IconButton
                                    aria-label="editar"
                                    color="primary"
                                    onClick={() => editarEntrada(categoria)}
                                >
                                    <EditIcon />

                                </IconButton>
                                </Typography>
                                
                            </CardContent>
                        </Grid>         

                        </>
                    ))}
                </Grid>
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
    )
}

export default CategoriasList;