import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import services from "../services/apiServices";
import Headers from "../components/header";
import Footer from "../components/Rodape";

// henri254@gmail.com
export default function Meuservicos() {
  const { user, setUser } = useContext(UserContext);
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();
  function Services() {
    services
      .getmyServices(user.token)
      .then((res) => {
        setOfertas([...res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }
  useEffect(() => {
    if (!user) {
      alert("Faça login");
      navigate("/");
    } else {
      Services()
    }
  }, []);
  function habilitar(id) {
    services
      .AtivarDesativarServico(id)
      .then((res) => Services())
      .catch((err) => console.log(err.response.data));
  }
  return (
    <>
      <HomeContainer>
        <Headers page="true" />
        <TransactionsContainer>
          <ul>
            {ofertas.map((service) => (
              <ListItemContainer cor={service.ativo === true
                ? "rgb(33, 7, 7);"
                : "rgb(20, 110, 35):"}>
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

                  <button onClick={() => habilitar(service.id)}>
                    {service.ativo === true
                      ? "Desabilitar Servico"
                      : "Habilitar Servico"}
                  </button>
                </div>
              </ListItemContainer>
            ))}
          </ul>
        </TransactionsContainer>
      </HomeContainer>
      <Footer />
    </>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0);
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

const ListItemContainer = styled.li`

  width: 100%;
  position: relative;
  height: 100%;
  background-color: rgb(56, 46, 37);
  border: 1px solid #edeced;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  margin: 10px auto;
  color: #edeced;
  
  @media (max-width: 768px) {
    height: 600px;
    justify-content: inherit;
    p {
      margin-top: 20px;
    }
  }

  h2 {
    color: rgb(255, 109, 37);
    font-size: 34px;
    font-family: "Permanent Marker", cursive;
    margin: 20px 20px 25px 90px;
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
      top: 30px;
      height: 217px;
      @media (max-width: 768px) {
        position: absolute;
        width: 300px;
        left: 8%;
        top: 345px;
        top: 345px;
        bottom: 0px;
      }
    }
  }
  button {
    background-color: ${(props)=> props.cor};
    border: 2px solid black;
    border-radius: 35px;
    width: 50%;
    margin-top: 10px;
  }
  button:hover {
    background-color: rgb(161, 161, 161);
    transition: 2s;
  }
`;
