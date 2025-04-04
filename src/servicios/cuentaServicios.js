import axios from "axios";
import apiURL from "../UrlBackend";

export const loginUser = async ({ username, password }) => {
    // const respuesta = await axios.post(`${apiURL}/api/token/`, credenciales);
    const respuesta = await axios.post(`${apiURL}/api/token/`, {
        username: username,
        password: password
      });
    return respuesta.data;
};


export const logoutUser = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return window.location.href = '/';
    
}


export const getAutores = async () => {
    const response = await axios.get(`${apiURL}/cuenta/usuarios/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        mode: 'no-cors',
    });
    console.log(response.data);
    return response.data;
};
