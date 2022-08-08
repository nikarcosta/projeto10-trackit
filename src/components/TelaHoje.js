import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import dayjs from 'dayjs';
import locale from "dayjs/locale/pt-br";

import Header from "./Header";
import Footer from "./Footer";

export default function TelaHoje() {
    const { user, porcentagem, setPorcentagem } = useContext(UserContext);
    const [habitosDoDia, setHabitosDoDia] = useState([]);
    const [concluidoId, setConcluidoId] = useState([]);

    const token = user.token;
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

    const dataAtual = dayjs().format("DD/MM");
    const dataAtualDiaDaSemana = dayjs().locale("pt-br").format("dddd");

    function renderizarTopoConteudo() {

        const subtitulo = () => {
            if(concluidoId.length === 0){
                return(<span>Nenhum hábito concluído ainda</span>)
            } else{
                setPorcentagem((concluidoId.length / habitosDoDia.length)*100);
                return(<span>{porcentagem.toFixed()}% dos hábitos concluídos </span>)
            }
        }

        return (
            <>
                <TopoConteudo concluidoId={concluidoId}>
                    <h2>{dataAtualDiaDaSemana.charAt(0).toUpperCase() + dataAtualDiaDaSemana.slice(1)}, {dataAtual}</h2>
                    {subtitulo()}
                </TopoConteudo>
            </>
        )
    }

    function RequisitarListaDeHabitosDoDia() {
        useEffect(() => {
            const promise = axios.get(`${URL}/habits/today`, config);

            promise.then((response) => {
                const { data } = response;
                setHabitosDoDia(data);
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });
        }, []);
    }

    function renderizarListaDeHabitosDoDia() {
        const habitoDoDia = habitosDoDia.map((item, index) => {
            if(item.done === true && concluidoId.includes(item.id) === false){
                setConcluidoId([...concluidoId, item.id])
            }
            return (
                <>
                    <ContainerHabito key={index}>
                        <InfohabitosDoDia id={item.id} concluidoId={concluidoId} highestSequence={item.highestSequence} currentSequence={item.currentSequence}  >
                            <h5>{item.name}</h5>
                            <span>Sequência atual: <span className="progresso">{item.currentSequence} dia(s) </span></span>
                            <span>Seu recorde: <span className="record">{item.highestSequence} dia(s) </span></span>
                        </InfohabitosDoDia>
                        <CheckButton type="button" key={item.id} id={item.id} concluidoId={concluidoId} onClick={(event) => finalizarHabito(item.id, event)}>
                            <ion-icon name="checkbox"></ion-icon>
                        </CheckButton >
                    </ContainerHabito>
                </>
            )
        });

        if (habitosDoDia.length > 0) {
            return (
                habitoDoDia
            );
        }
    }

    function finalizarHabito(id, event) {
        const body = {
            id,
        };

        const concluido = concluidoId.some(e => e === id);

        if (!concluido) {
            setConcluidoId([...concluidoId, id])
            requisicaoParaFinalizarHabito(id, event, body);
        } else {
            const newconcluido = concluidoId.filter(e => e !== id);
            setConcluidoId(newconcluido);
            requisicaoParaDesfazerFinalizarHabito(id, event, body);
        }
    }

    function requisicaoParaFinalizarHabito(id, event, body) {
        event.preventDefault();
        
        const promise = axios.post(`${URL}/habits/${id}/check`, body, config);
        
        promise.then((response) => {
            const promise = axios.get(`${URL}/habits/today`, config)

            promise.then((response) => {
                const { data } = response;
                setHabitosDoDia(data);
            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        });
    }

    function requisicaoParaDesfazerFinalizarHabito(id, event, body){
        event.preventDefault();

        const promise = axios.post(`${URL}/habits/${id}/uncheck`, body, config);

        promise.then((response) => {
            const promise = axios.get(`${URL}/habits/today`, config)

            promise.then((response) => {
                const { data } = response;
                setHabitosDoDia(data);
                const newconcluido = concluidoId.filter(e => e !== id);
                setConcluidoId(newconcluido);

            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        })
    }

    const topoConteudo = renderizarTopoConteudo();
    const requisicaoDaListaDeHabitos = RequisitarListaDeHabitosDoDia();
    const listaHabitosRenderizada = renderizarListaDeHabitosDoDia();


    return (
        <Container>
            <Header />
            {topoConteudo}
            {requisicaoDaListaDeHabitos}
            {listaHabitosRenderizada}
            <Footer porcentagem={porcentagem}/>
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2; 
    min-height: 100vh;
    padding: 0 18px;
    margin-bottom: 75px; 


    :-moz-last-node{
        padding-bottom:20px;
    }
`

const TopoConteudo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 28px;
    
    h2 {
        margin-top:112px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
        margin-bottom: 5px;
    }

    span {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #${props => (props.concluidoId.length === 0) ? "BABABA" : "8FC549"};
        line-height: 22px;
    }
`

const ContainerHabito = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding:13px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom:29px;
    font-family: 'Lexend Deca', sans-serif;

`

const CheckButton = styled.button`

    border:none;
    cursor:pointer;
    background-color: #FFFFFF;
        
    ion-icon {
        font-size:75px;
        color: #${props => ((props.concluidoId.find((e) => e === props.id)) === undefined) ? "E7E7E7" : "8FC549 "};
        margin: -8px;
    }
`

const InfohabitosDoDia = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Lexend Deca', sans-serif;

    h5 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #666666;
        line-height: 25px;
        margin-bottom:7px;
    }

    span {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 13px;
        color: #666666;
        line-height: 16px;
    }

    .progresso {
        color: #${props => ((props.concluidoId.find((e) => e === props.id)) === undefined) && (props.highestSequence === props.currentSequence) ? "666666" : "8FC549 "};
    }

    .record {
        color: #${props => ((props.highestSequence === props.currentSequence && props.highestSequence !== 0) && (props.concluidoId.find((e) => e === props.id)) !== undefined) ? "8FC549" : "666666"};
    }
`
