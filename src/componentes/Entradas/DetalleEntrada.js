import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Index/NavBar";
import { getEntradaSlug } from "../../servicios/blogServicios";
import apiURL from "../../UrlBackend";
import { Link } from "react-router-dom";
import { Container, Typography, Card, CardContent, Chip, CardMedia, Button, Box, Divider, Skeleton, Avatar, Stack} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const DetalleEntrada = () => {

    const { slug } = useParams();
    const [entrada, setEntrada] = useState([]);


    const obtenerEntrada = async () => {
        const response = await getEntradaSlug(slug);
        setEntrada(response);      

    }

    useEffect(() => {
        obtenerEntrada();
    }, []);



    return (
        <>
            <NavBar />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Button
                    component={Link}
                    to={`/entradas`}
                >
                    Volver a las entradas
                </Button>
                <Card elevation={13} sx={{ mt: 4 }}>

                    <CardContent>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
                        >
                            {entrada.titulo}
                        </Typography>
                    </CardContent>

                    <CardMedia
                        component={"img"}
                        image={`${apiURL}${entrada.imagen}`}
                        alt="IMAGEN PREDETERMINADA"
                    />

                    <Box>
                        {entrada.autor && ( <>
                        <Avatar alt="imagen avatar"
                            src={`${apiURL}${entrada.autor.avatar ? entrada.autor.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7orGuALpHoervxkGNHgKvtv1GtqTTkpbzA&s"}`} 
                            sx={{ width: 30, height: 30, mr: 1 }}
                        >
                            <PersonIcon />

                        </Avatar>
                        <Typography variant="body1">
                            {entrada.autor.usuario.username}
                        </Typography>

                        </>)}
                        
                    </Box>
                    {entrada.categoria && (<>
                        <Box>
                            <Stack direction="row" spacing={1}>
                                {entrada.categoria.map((categoria) => (
                                    <>
                                    <Chip key={categoria.id} label={categoria.nombre} />
                                    </>
                                ))}
                            </Stack>
                        </Box>
                        </>)}
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ mt: 3 }}
                    >
                        {entrada.contenido}
                    </Typography>


                </Card>
            
            </Container>

        </>
    )
}

export default DetalleEntrada;