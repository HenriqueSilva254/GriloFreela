import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import Katana from "../img/katana.jpg"
import Katanamobile from "../img/katanamobile.jpg"

export default function Headers(props) {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  function logout() {
    localStorage.clear();
    setUser();
    navigate("/");
  }

  return (
    <>
    <Header>
      <div>
        <Link to="/HomePage"><h1>GetSamurais</h1></Link>
        <BiExit onClick={logout} />
      </div>
    </Header>
    <ImagemCabecario img={Katana} imgmb={Katanamobile}>
        <DarkOverlay>
          <h1>Os melhores profissionais em um só lugar</h1>
        </DarkOverlay>
        <ButtonsContainer>
          <button
            data-test="new-income"
            onClick={() => {
              navigate("/criar/servico");
            }}
          >
            Criar novo Serviço
          </button>
          <button
            data-test="new-expense"
            onClick={() => {props.page? navigate("/HomePage") : navigate("/Meus/Servicos") }}
          >
             {props.page? 'Pagina Inicial': 'Meus Serviço'}   
          </button>
        </ButtonsContainer>
      </ImagemCabecario>
    </>
    
  );
}

const Header = styled.header`
  width: 100%;
  font-size: 26px;
  background-color: #262121;
  color: white;
  font-family: 'Permanent Marker', cursive;
  div {
    height: 40px;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  a{
    padding: 0;
    h1{
        margin: 0;
    }
  }
`;

const ImagemCabecario = styled.div`
  position: relative;
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 400px;
  @media (max-width: 768px) {
    height: 600px;
    background-image: ${(props) => `url(${props.imgmb})`};
  }
`;
const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Camada escura com opacidade */
  h1 {
    margin-top: 10%;
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-size: 40px;
  }
`;

const ButtonsContainer = styled.section`
  margin-top: 250px;
  display: flex;
  gap: 15px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  justify-content: center;
  position: relative;
  @media(max-width: 768px) {
     flex-direction:column ;
     align-items: center;
     
    }
  button {
    width: 20%;
    height: 69px;
    @media(max-width: 768px) {
      width: 80%;
    height: 69px;
    }
  }
  button:hover{
    background-color: rgb(28 163 51);
    transition: 2s;
  }
`;