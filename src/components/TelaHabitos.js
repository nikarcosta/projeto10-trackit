import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

export default function TelaHabitos(){

    function montarFooter(){
        return(
            <>
               <h1>Hábitos</h1>
               <h1>Loader</h1>
               <h1>Histórico</h1> 
            </>
        );
    }

    function adicionarHabito() {
        
        return(
            <>  
                <input type="text" />
                <div><button>D</button>
                <button>S</button>
                <button>T</button>
                <button>Q</button>
                <button>Q</button>
                <button>S</button>
                <button>S</button>
                </div>
                <div><button>Cancelar</button><button>Salvar</button></div>
            </>
        );
        
    }



    const footer = montarFooter();
    const novoHabito = adicionarHabito();

    return(
        <>
        <Header/>
        <Container>
            <div><h1>Meus hábitos</h1><button>+</button></div>
            <Habito>
                {novoHabito}
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
