import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/logo.png";


export default function TelaLogin(){

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [enable, setEnable] = useState(true);

    const { setUser } = useContext(UserContext);

    function handleLogin(e){

        e.preventDefault();

        const body = {
            email,
            password
        }

        const promise = axios.post(`${URL}/auth/login`, body);

        promise.then((response) => {
            const {data} = response;

            setUser({
                id: data.id,
                name: data.name,
                image: data.image,
                email: data.email,
                token: data.token
            });
        
            navigate("/habitos");
        });

        promise.catch((err) => {
            const message = err.response.statusText;
            alert(message);
            setEmail("");
            setPassword("");
            setEnable(true);
        });

    }

    function montarFormularioLogin(){
        return(
            <>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" name="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div>
                        {
                            enable ? <button type="submit"><span>Login</span></button> : <button type="submit"><ThreeDots width={303} height={15} color={"#FFFFFF"} /></button>
                        }
                    </div>
                </form>
            </>
        );
    }

    const formLogin = montarFormularioLogin();
    return(
        
        <Container>
            <div><img src={logo} alt="logo" /></div>
            <FormularioLogin enable={enable}>{formLogin}</FormularioLogin>
            <StyledLink to="/cadastro"><h1>Não tem uma conta? Cadastre-se!</h1></StyledLink>
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
        background: ${props => props.enable ? '#FFFFFF' : '#F2F2F2'};
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
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
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
        opacity: ${props => props.enable ? '1' : '0.7'};
        cursor: pointer;
    }

`;

const StyledLink = styled(Link)`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #52B6FF;
    margin-bottom: 30px;
    
    &:hover{
        text-decoration: underline;
    }
`;

