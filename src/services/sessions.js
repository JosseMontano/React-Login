import {http, axios } from "./htpp";

export const loginRequest = async (user) => await axios.post(`${http}login`, user);

export const perfilRequest = async (token) => await axios.post(`${http}perfil`,{
data: {}
},{
    headers:{
        authorization:`Bearer ${token}`,
    },
}


);