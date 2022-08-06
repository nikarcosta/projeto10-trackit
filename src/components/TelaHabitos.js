import { useState , useEffect} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { ThreeDots } from 'react-loader-spinner';

import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import lixeira from "../assets/delete.png"

export default function TelaHabitos(){

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

    const { user } = useContext(UserContext);
    const token = user.token;


    const [adicionarCardHabito, setAdicionarCardHabito] = useState(false);
    const [diasSelecionados, setDiasSelecionados] = useState([]);

    const diasDaSemana = [{day: "D", day: "S", day: "T", day: "Q", day: "Q", day: "S", day: "S"}];

    const [listaDeHabitos, setListaDeHabitos] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    /*
    function requisitarListaDeHabitos(){
        useEffect(() => {
            const promise = axios.get(`${URL}/habits"`, config);

            promise.then((response) => {
                const { data } = response;
                setListaDeHabitos(data);
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });

        }, []);


    }*/

    function renderizarTopoConteudo(){
        return (
            <TopoConteudo>
                    <h2>Meus Hábitos</h2>
                    <button onClick={() => adicionarCardHabito(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
            </TopoConteudo>
        );
    }


/*

    function adicionarHabito() {
        
        return(
            <>  
                <input type="text" placeholder="nome do hábito" />
                <div className="dias">
                    {
                        diasDaSemana.map((diaSemana, index) => {
                            const { dia, day } = diaSemana;
                            const selecionado = diasSelecionados.some(dias => dias.day === day);
                            return <BotaoDia
                                key={index}
                                dia={dia}
                                day={day}
                                selecionado={selecionado}
                                aoSelecionar={ day => toggle(day)}
                            />
                        })
                    }

                </div>
                <div><button className="cancelar" onClick={() => setVisivel(!visivel)}>Cancelar</button><button className="salvar">Salvar</button></div>
            </>
        );
        
    }*/

    function listarHabitos(){
        

        

        return (
            <>
            <div className="left">
                <div><span>Tarefa 1</span></div>
                <div className="dias"><button>D</button>
                    <button>S</button> 
                    <button>T</button>
                    <button>Q</button>
                    <button>Q</button>
                    <button>S</button>
                    <button>S</button>
                </div>
            </div>
            <div className="right">
                <img src={lixeira} alt="deletar" />
            </div>
            
            </>
        );
    }



    //const novoHabito = adicionarHabito();
    const adicionado = listarHabitos();
    const topoConteudo = renderizarTopoConteudo();
    

    return(
        <>
            <Container>
                <Header/>
                {topoConteudo}
            
                <Footer />
            </Container>
        </>
    );

}


const Container = styled.div`
    min-height: 100vh;
    background-color: #E5E5E5;
    padding: 0 18px;
    margin-bottom: 75px;

    :-moz-last-node {
        padding-bottom:20px;
    }

    span {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    }
`;

const TopoConteudo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    
    h2 {
        margin-top:112px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
    }

    svg {
        margin-top:112px;
        width:40px;
        height:35px;
        color:#52B6FF;
        cursor: pointer;
    }

    button {
        border:none;
        background-color: #f2f2f2;
    }
`

const Habito = styled.div`

    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-right: 10px;
    border-radius: 5px;

    margin: 15px 15px;

    input {

        width: 100%;
        height: 45px;
        padding-left: 5px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;


        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #DBDBDB;

    
    }

    .dias {
        margin-top: 10px;
        margin-bottom: 15px;
        display: flex;
        justify-content: left;
    }



    div {
        display: flex;
        justify-content: end;
        margin-bottom: 15px;
    }

    button {
        cursor: pointer;
        width: 84px;
        height: 35px;
        margin-left: 10px;

        font-family: Lexend Deca;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        border: none;

    }

    .cancelar {
        background-color: #FFFFFF;
        color: #52B6FF;
    }

    .salvar {
        border-radius: 5px;
        background-color: #52B6FF;
        color: #FFFFFF;
    }




`;


const Caixa = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-right: 10px;
    border-radius: 5px;

    margin: 15px 15px;


    .dias {
        margin-top: 10px;
        margin-bottom: 15px;
        display: flex;
        justify-content: left;
    }

    .dias button {
        border: 1px solid #D4D4D4;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background-color: #FFFFFF;
        margin-right: 5px;
        
        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #DBDBDB;
    }

    div {
        margin-top: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #666666;
    }
`;