import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/logo.png";

export default function TelaCadastro(){

    const [enable, setEnable] = useState(true);

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function handleSignUp(e){
        e.preventDefault();
        setEnable(false);

        const body = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: formData.image
        }

        const promise = axios.post(`${URL}/auth/sign-up`, body);

        promise.then(response => {
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        });
        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
            setFormData({
                email: "",
                name: "",
                image: "",
                password: ""
            });
            setEnable(true);
        });
    }

    function handleForm(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function montarFormularioCadastro(){
        return(
            <>
                <form onSubmit={handleSignUp} enable={enable}>
                    <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleForm} required />
                    <input type="password" name="password" placeholder="senha" value={formData.password} onChange={handleForm}   required />
                    <input type="text" name="name" placeholder="nome" value={formData.name} onChange={handleForm}  required />
                    <input type="url" name="image" placeholder="foto" value={formData.image} onChange={handleForm}  required />
                    <div>
                        {
                            enable ? <button type="submit"><span>Cadastrar</span></button> : <button type="submit"><ThreeDots width={303} height={15} color={"#FFFFFF"} /></button>
                        }
                    </div>
                </form>
            </>
        );
    }

    const formCadastro = montarFormularioCadastro();
    return(
        
        <Container>
            <div><img src={logo} alt="logo" /></div>
            <FormularioCadastro enable={enable}>{formCadastro}</FormularioCadastro>
            <StyledLink to="/"><h1>Já tem uma conta? Faça login!</h1></StyledLink>
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

const FormularioCadastro = styled.div`

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
