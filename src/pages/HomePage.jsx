import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import services from "../services/apiServices";
import Headers from "../components/header";
import Footer from "../components/Rodape";

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
    <>
    <HomeContainer>
      <Headers />
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
    <Footer></Footer>
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
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  margin: 10px auto;
  color: #edeced;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 500px;
    height: 600px;
    justify-content: inherit;
    p {
      margin-top: 20px;
    }
  }

  h2 {
    color: #ff6d25;
    font-size: 28px;
    font-family: 'Permanent Marker', cursive;
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
