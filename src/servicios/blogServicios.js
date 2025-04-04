import axios from "axios";
import apiURL from "../UrlBackend";

console.log("localStorage.getItem('token')", localStorage.getItem('token'));

const api = axios.create({
    baseURL: `${apiURL}/entradas`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    mode: 'no-cors',
})

// entradas


export const getEntradas = async () => {
    const response = await api.get('/api/entradas/');
    return response.data;
};


export const createEntrada = async (datos) => {
    const response = await api.post('/api/entradas/', datos, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const editarEntrada = async (id, datos) => {
    const response = await api.put(`/api/entradas/${id}/`, datos, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getEntradaId = async (id) => {
    const response = await api.get(`/api/entradas/${id}`);
    return response.data;
};

export const getEntradaSlug = async (slug) => {
    const response = await api.get(`/api/entradas/${slug}?format=json`);
    return response.data;
};

export const eliminarEntradaId = async (id) => {
    const response = await api.delete(`/api/entradas/${id}`);
    return response.data;
};


// categorias

export const getCategorias = async () => {
    const response = await api.get('/api/categorias');
    return response.data;
};

export const crearCategoria = async (datos) => {
    const response = await api.post('/api/categorias/', datos);
    return response.data;
};

export const getCategoriaId = async (id) => {
    const response = await api.get(`/api/categorias/${id}`);
    return response.data;
};

export const editarCategoriaId = async (id, datos) => {
    const response = await api.put(`/api/categorias/${id}/`, datos);
    return response.data;
};

export const eliminarcategoriaId = async (id) => {
    const response = await api.delete(`/api/categorias/${id}`);
    return response.data;
};
