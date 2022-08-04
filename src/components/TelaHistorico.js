import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

export default function TelaHistorico(){

    function montarFooter(){
        return(
            <>
               <h1>Hábitos</h1>
               <h1>Loader</h1>
               <h1>Histórico</h1> 
            </>
        );
    }



    const footer = montarFooter();

    return(
        <>
        <Header/>
        <Container>
            <div><h1>Histórico</h1></div>
            <div><span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span></div>
        <Footer>
            {footer}
        </Footer>
        </Container>
        </>
    );

}


const Container = styled.div`
    
    margin-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #E5E5E5;



`;

