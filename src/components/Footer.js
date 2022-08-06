import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import styled from "styled-components";



export default function Footer(){

    const { porcentagem } = useContext(UserContext);

    return(
        <Container>
            <Link to="/habitos">
                <button>Hábitos</button>
            </Link>
            <Link to="/hoje">
            <ProgressBar>
                    <CircularProgressbar
                        value={porcentagem}
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </ProgressBar> 
            </Link>
            <Link to="/historico">
                <button>Histórico</button>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 70px;
    background-color: #FFFFFF;
    z-index:1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
        font-family: Lexend Deca;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #52B6FF;
        cursor: pointer;
        background-color: #FFFFFF;
        border: none;
    }
    
`

const ProgressBar = styled.div`
    width:91px;
    height: 91px;
    position: fixed;
    bottom: -40px;
    left:50%;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
    transform: translate(-50%, -50%);
`


