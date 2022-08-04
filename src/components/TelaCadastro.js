import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TelaCadastro(){

    const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


    const [formData, setFormData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function handleSignUp(e){
        e.preventDefault();

        const promise = axios.post(`${BASE_URL}/auth/sign-up`, {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: formData.image
        });

        promise.then(response => console.log(response));
        promise.catch(error => console.log(error.response))

    }

    function montarFormularioCadastro(){
        return(
            <>
                <form onSubmit={handleSignUp}>
                    <input type="email" name="email" placeholder="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}   required />
                    <input type="password" name="password" placeholder="senha" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}   required />
                    <input type="text" name="name" placeholder="nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value}) }  required />
                    <input type="url" name="image" placeholder="foto" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value}) }  required />
                    <div>
                        <button><span>Cadastrar</span></button>
                    </div>
                </form>
                <div><h1>Já tem uma conta? Faça login!</h1></div>
            </>
        );
    }

    const formCadastro = montarFormularioCadastro();
    return(
        
        <Container>
            <div><img src={logo} alt="logo" /></div>
            <FormularioCadastro>{formCadastro}</FormularioCadastro> 
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
