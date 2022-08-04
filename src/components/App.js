import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";
import GlobalStyle from "../styles/globalStyles";

export default function App(){
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    return(
        <>
        <UserContext.Provider value={{user, setUser}}>
            <TokenContext.Provider value={{token, setToken}}>
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
            </TokenContext.Provider >
        </UserContext.Provider>
        </>
    );
}