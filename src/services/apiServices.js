import axios from "axios";


function createConfig(token){
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }
    return config
}
function getServiceId(token, id){
   
    const promisse = axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, createConfig(token))
    return promisse
}
function getmyServices(token){
   
    const promisse = axios.get(`${import.meta.env.VITE_API_URL}/my/services`, createConfig(token))
    return promisse
}
function getAllServices(token){
   
    const promisse = axios.get(`${import.meta.env.VITE_API_URL}/services`, createConfig(token))
    return promisse
}
function postService(token, body){

    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/new/service`, body, createConfig(token))
    return promisse
}
function AtivarDesativarServico(id){


    const promisse = axios.put(`${import.meta.env.VITE_API_URL}/ativar/desativar/${id}`)
    return promisse

   
}


const services = {getServiceId, getAllServices, postService, getmyServices, AtivarDesativarServico}
export default services

        // titulo: dados.titulo,
        // descricao: dados.descricao,
        // categoria: dados.categoria,
        // experiencia: dados.experiencia,
        // name: dados.name