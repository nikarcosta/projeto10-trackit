import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";

import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

import GlobalStyle from "../styles/globalStyles";

export default function App(){
    const [user, setUser] = useState({});
    const [porcentagem, setPorcentagem] = useState(10);

    return(
        <>
        <UserContext.Provider value={{user, setUser, porcentagem, setPorcentagem}}>
        <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                    <Route path="/cadastro" element={<TelaCadastro />} />
                    <Route path="/habitos" element={<TelaHabitos />}/>
                    <Route path="/hoje" element={<TelaHoje />} />
                    <Route path="historico" element={<TelaHistorico />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
        </>
    );
}