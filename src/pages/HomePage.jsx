import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import services from "../services/apiServices";
import Headers from "../components/header";

// henri254@gmail.com
export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Faça login");
      navigate("/");
    } else {
      services
        .getAllServices(user.token)
        .then((res) => {
          setOfertas([...res.data]);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <HomeContainer>
      <Headers />
      <ImagemCabecario>
        <DarkOverlay>
          <h1>Encontre um profissional para seu negócio</h1>
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
            onClick={() => {
              navigate("/nova-transacao/saida");
            }}
          >
             Meus Serviço   
          </button>
        </ButtonsContainer>
      </ImagemCabecario>
      <TransactionsContainer>
        <ul>
          {ofertas.map((service) => (
            <ListItemContainer
              onClick={() => navigate(`/proposta/${service.id}`)}
            >
              <h2>{service.titulo}</h2>
              <div>
                <p>
                  <strong>Servico prestado por:</strong> {service.name}
                </p>
                <p>
                  <strong>Descricao:</strong> {service.descricao}{" "}
                </p>
                <img src={service.imagem} alt="" />
                <p>
                  <strong>Preco: </strong>
                  {service.preco}
                </p>
                <p>
                  <strong>Publicado em</strong>:{" "}
                  {new Date(service.datapostagem).toLocaleDateString()}
                </p>
              </div>
            </ListItemContainer>
          ))}
        </ul>
      </TransactionsContainer>
    </HomeContainer>
  );
}

const ImagemCabecario = styled.div`
  position: relative;
  background-image: url("https://cdn.wizard.com.br/wp-content/uploads/2020/05/06155457/PJ-ou-CLT-qual-o-melhor-regime-de-trabalho.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 400px;
  @media (max-width: 768px) {
    height: 600px;
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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  strong {
    font-size: 21px;
    font-weight: 700;
  }
`;

const TransactionsContainer = styled.article`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  flex-grow: 1;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
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
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  width: 100%;
  position: relative;
  height: 100%;
  background-color: #fcf5f7;
  border: 1px solid #edeced;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  margin: 10px auto;

  @media (max-width: 768px) {
    height: 600px;
    justify-content: inherit;
    p {
      margin-top: 20px;
    }
  }

  h2 {
    color: #7171e7;
    font-size: 28px;
    height: 30px;
    margin-left: 10px;
  }
  div {
    width: 100%;
    max-width: 780px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    p {
      font-size: 20px;
    }
    img {
      position: absolute;
      width: 300px;
      left: 768px;
      top: 6px;
      height: 217px;
      @media (max-width: 768px) {
        position: absolute;
        width: 300px;
        left: 8%;
        top: 345px;
        bottom: 0px;
      }
    }
  }
`;
