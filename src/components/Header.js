import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header(){

    const { user } = useContext(UserContext);
    return (
        <Titulo>
            <h1>TrackIt</h1>
            <img src={user.image} alt={user.name} />
        </Titulo>
    );
}


const Titulo = styled.div`
    height: 70px;
    width: 100%;
    left: 0px;
    top: 0px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position:fixed;
    top:0;
    right:0;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index:1;

    *{
        margin-top: 5px;
        margin-bottom: 5px;
    }

    h1 {
        margin-left: 20px;
        font-family: Playball;
        font-size: 39px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: left;
        color: #FFFFFF;
    }

    img {        
        width: 51px;
        height: 51px;
        left: 306px;
        top: 9px;
        border-radius: 98.5px;
        margin-right: 20px;
    }

`