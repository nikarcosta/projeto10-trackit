import { useState , useEffect} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { ThreeDots } from 'react-loader-spinner';

import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function TelaHabitos(){

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

    const { user } = useContext(UserContext);
    const token = user.token;


    const [enable, setEnable] = useState(true);
    const [adicionarCardHabito, setAdicionarCardHabito] = useState(false);
    const [name, setName] = useState("");
    const [days, setDays] = useState([]);

    const diasDaSemana = [{day: "D"}, {day: "S"}, {day: "T"}, {day: "Q"}, {day: "Q"}, {day: "S"}, {day: "S"}];

    const [listaDeHabitos, setListaDeHabitos] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    
    function renderizarTopoConteudo(){
        return (
            <>
            <TopoConteudo>
                    <h2>Meus Hábitos</h2>
                    <button onClick={() => {
                        setAdicionarCardHabito(true);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
            </TopoConteudo>
            {novoCardHabito}
            </>
        );
    }


    function renderizarCardAdicionarHabito() {

        const botoesDiadaSemana = diasDaSemana.map((diaDaSemana, index) => {
            return (
                <BotaoDiaDaSemana type="button" enable={enable} key={index} id={index} days={days} onClick={() => selecionarDiaDaSemana(index) }>{diaDaSemana.day}</BotaoDiaDaSemana>
            );
        });

        if(adicionarCardHabito){

            return (
                <ContainerHabito enable={enable} onSubmit={adicionarHabito}>
                    <input type="text" id="name" value={name} placeholder="nome do hábito" onChange={(e) => setName(e.target.value)} required/>
                    <Grid>
                        {botoesDiadaSemana}
                    </Grid>
                    <ActionButtons enable={enable}>
                        <button className="cancelar" onClick={() => setAdicionarCardHabito(false)}>Cancelar</button>
                        {enable ? <button type="submit">Salvar</button> : <button type="submit"><ThreeDots width={303} height={15} color={"#FFFFFF"} /></button>}
                    </ActionButtons>
                </ContainerHabito >
            );


        }
        
    }

    const novoCardHabito = renderizarCardAdicionarHabito();


    function selecionarDiaDaSemana(index){
        const selecionado = days.some(day => day === index);

        if(!selecionado){
            setDays([...days, index]);
        }else{
            const novosSelecionados = days.filter(day => day !== index);
            setDays(novosSelecionados);
        }
    }


    function adicionarHabito(event){
        event.preventDefault();
        setEnable(false);

        const body = {
            name,
            days
        };

        const promise = axios.post(`${URL}/habits`, body, config);

        promise.then((response) => {
            const { data } = response;
            setName("");
            setDays([]);
            setAdicionarCardHabito(false);
            setEnable(true);
            setListaDeHabitos([...listaDeHabitos, data]);
        });

        promise.catch((err) => {
            const message = err.response.statusText;
            alert(message);
            setEnable(true);
        })
    }


    function RequisitarListaDeHabitos() {
        useEffect(() => {
            const promise = axios.get(`${URL}/habits`, config);

            promise.then((response) => {
                const { data } = response;
                setListaDeHabitos(data);
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });
        }, []);

    }

    
    function renderizarListaDeHabitos(){

        const habitos = listaDeHabitos.map((item, index) => {

            const botoesDiadaSemana = diasDaSemana.map((diaDaSemana, index) => {
                return (
                    <BotaoDiaDaSemana type="button" enable={enable} key={index} id={index} days={item.days.map((e) => e)}>{diaDaSemana.day}</BotaoDiaDaSemana>
                );
            });

            return(
                <>
                    <ContainerHabito>
                        <TopoCardHabito>
                            <span>{item.name}</span>
                            <button onClick={(e) => deletarHabito(item, index, e)}>
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </TopoCardHabito>
                        <Grid>
                            {botoesDiadaSemana}
                        </Grid>
                    </ContainerHabito>
                </>
            );

        });

        if(listaDeHabitos.length > 0){
            return(habitos);
        } else {
            return(
                <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear.</span>
            );
        }


    }

    function deletarHabito(item, index, e){
        let confirmacao = window.confirm("Você tem certeza que quer deletar este hábito?")
        e.preventDefault();

        if (confirmacao) {
            const promise = axios.delete(`${URL}/habits/${item.id}`, config);

            promise.then((response) => {
                const promise = axios.get(`${URL}/habits`, config)

                promise.then((response) => {
                    const { data } = response;
                    setListaDeHabitos(data);
                });
            });

            promise.catch(err => {
                alert("Não  foi possível apagar o hábito!");
            })
        }
    }





    const topoConteudo = renderizarTopoConteudo();
    const listaHabitosRenderizada = renderizarListaDeHabitos();
    const requisicaoDaListaDeHabitos = RequisitarListaDeHabitos();

    return(
        <>
            <Container>
                <Header/>
                {topoConteudo}
                {requisicaoDaListaDeHabitos}
                {listaHabitosRenderizada}
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
        background-color: #E5E5E5;
    }
`;

const BotaoDiaDaSemana = styled.button`
    width: 30px;
    height: 30px;
    background: #${props => ((props.days.find((e) => e === props.id)) === undefined) ? "FFFFFF" : "CFCFCF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #${props => ((props.days.find((e) => e === props.id)) === undefined) ? "DBDBDB" : "FFFFFF"};
    margin-right: 4px;
    cursor:pointer;
    pointer-events: ${props => props.enable ? 'auto' : 'none'}; 
    
`

const ContainerHabito = styled.form`
    display: flex;
    flex-direction: column;
    padding:18px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom:29px;
    font-family: 'Lexend Deca', sans-serif;

    input {
        width: 100%;
        height: 45px;
        background: ${props => props.enable ? '#FFFFFF' : '#F2F2F2'};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color:#666666;
        padding: 10px;
        outline: none;
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
        align-items: flex-start;
    }
   
    ::placeholder {
        color: ${props => props.enable ? '#DBDBDB' : '#AFAFAF'};
        opacity: 1;
};
`

const Grid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 8px;
    align-items: flex-start;
`


const ActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    margin-top: 29px;

    button {
        width: 84px;
        height: 35px;
        border:none;
        background-color: #52B6FF;
        border-radius: 5px;
        color:#FFFFFF;
        font-size: 16px;
        opacity: ${props => props.enable ? '1' : '0.7'};
        margin-left:15px;
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
        cursor:pointer;
    }

    .cancelar {
        background: #FFFFFF;
        color: #52B6FF;
    }
`

const TopoCardHabito = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;

    ion-icon {
        font-size:20px;
        color: #666666;
        cursor:pointer;
    }

    button {
        background-color: #FFFFFF;
        border:none;
    }
`