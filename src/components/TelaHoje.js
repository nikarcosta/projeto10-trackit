import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

export default function TelaHoje(){

    function montarFooter(){
        return(
            <>
               <h1>Hábitos</h1>
               <h1>Loader</h1>
               <h1>Histórico</h1> 
            </>
        );
    }

    function mostrarHabito() {
        
        return(
            <>
            <div>
                <h2>Ler capítulo de livro</h2>
                <h1>Sequencia atual: 3 dias</h1>
                <h1>Seu recorde: 5 dias</h1>
            </div>
            <div><ion-icon name="checkbox"></ion-icon></div>  
            </>
        );
        
    }



    const footer = montarFooter();
    const habito = mostrarHabito();

    return(
        <>
        <Header/>
        <Container>
            <div><h1>Segunda, 17/05</h1><h1>Nenhum hábito concluído ainda</h1></div>
            <Habito>
                {habito}
            </Habito>
            <div><span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span></div>
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

const Habito = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-self: start;

    * {
    margin: 5px 0;
    }

    input {
    width: 303px;
    height: 45px;
    padding-left: 20px;
    }

    div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

`;
