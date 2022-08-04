import styled from "styled-components";
import profilePic from "../assets/profilepic.png"

export default function Header(){
    return (
        <Titulo>
            <h1>TrackIt</h1>
            <img src={profilePic} alt="profilePic" />
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