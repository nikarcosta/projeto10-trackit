import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


function fazerCadastro(){
    const promise = axios.post(`${BASE_URL}/auth/sign-up`);
    return promise;
}

function fazerLogin(){
    const promise = axios.post(`${BASE_URL}/auth/login`);
    return promise;
}

function criarHabito(){
    const promise = axios.post(`${BASE_URL}/habits`);
    return promise;
}

function listarHabitos(){
    const promise = axios.get(`${BASE_URL}/habits`);
    return promise;
}


function deletarHabito(habitoId){
    const promise = axios.delete(`${BASE_URL}/${habitoId}`);
    return promise;
}

function buscarHabitos(){
    const promise = axios.get(`${BASE_URL}habits/today`);
    return promise;
}

function marcarHabitoComoFeito(habitoId){
    const promise = axios.post(`${BASE_URL}/${habitoId}/check`);
    return promise;
}

function desmarcarHabitoComoFeito(){
    const promise = axios.post(`${BASE_URL}/${habitoId}/uncheck`);
    return promise;
}

function historicoHabitos(){
    const promise = axios.get(`${BASE_URL}/habits/history/daily`);
    return promise;
}


export { fazerCadastro, fazerLogin, criarHabito, listarHabitos, deletarHabito, buscarHabitos, marcarHabitoComoFeito, desmarcarHabitoComoFeito, historicoHabitos };

