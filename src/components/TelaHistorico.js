import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function TelaHistorico(){
    
    return(
        <>
            <Container>
                <Header/>
                    <TopoConteudo>
                        <h2>Histórico</h2>
                        <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
                </TopoConteudo>
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
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 28px;
    
    h2 {
        margin-top:112px;
        margin-bottom: 17px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
    }
`



