import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function TelaHoje(){

    return(
        <>
        <Container>
            <Header/>
            <Footer/>
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


