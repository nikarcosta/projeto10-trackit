import styled from "styled-components";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext"
import UserContext from "../contexts/UserContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TelaLogin(){

    const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);

    function handleLogin(e){

        e.preventDefault();

        const promise = axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        });

        promise.then((response) => {
            setUser(response.data);
            setToken(response.data.token);
            navigate("/habitos");
        });

        promise.catch((error) => console.log(error.response));

    }

    function montarFormularioLogin(){
        return(
            <>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" name="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div>
                        <button><span>Entrar</span></button>
                    </div>
                </form>
                <div><h1>Não tem uma conta? Cadastre-se!</h1></div>
            </>
        );
    }

    const formLogin = montarFormularioLogin();
    return(
        
        <Container>
            <div><img src={logo} alt="logo" /></div>
            <FormularioLogin>{formLogin}</FormularioLogin> 
        </Container>
        
    );
}


const Container = styled.div`

    margin-top: 90px;
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        margin-bottom: 30px;
    }

`

const FormularioLogin = styled.div`

    display: flex;
    flex-direction: column;
    align-self: start;
    width: 100%;
    margin-bottom: 100px;

    * {
        margin: 5px 0;
    }

    input {
        width: 100%;
        height: 50px;
        padding-left: 20px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #DBDBDB;
        border-radius:5px;
        border: 1px solid #D5D5D5;
    }

    button {
        width: 100%;
        height: 50px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #FFFFFF;
    }

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;

