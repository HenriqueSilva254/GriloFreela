import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import services from "../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Headers from "../components/header";
import Footer from "../components/Rodape";

function Propostas() {
  const { user } = useContext(UserContext);
  const [service, setService] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      alert("Faça login");
      navigate("/");
    } else {
      services
        .getServiceId(user.token, id)
        .then((res) => {
          console.log(res.data);
          setService(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      <Container>
        <Fundo>
          <img
            src="https://i.pinimg.com/564x/89/c2/b1/89c2b1f6d6204d81ab336c314fe2fdc7.jpg"
            alt=""
          />
        </Fundo>

        <ContainerCenter>
          <ListItemContainer>
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
                R$ {service.preco}
              </p>
              <p>
                <strong>Telefone:</strong> {service.telefone}
              </p>
              <p>
                <strong>Cidade: </strong>
                {service.cidade}
              </p>
              <p>
                <strong>Publicado em</strong>:{" "}
                {new Date(service.datapostagem).toLocaleDateString()}
              </p>
            </div>
          </ListItemContainer>
        </ContainerCenter>
        <button onClick={() => navigate("/HomePage")}>Retornar ao menu</button>
      </Container>
      <Footer />
    </>
  );
}
const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  button {
    position: relative;
    bottom: 700px;
    width: 20%;
    left: 40%;
    border: 2px solid;
    border-radius: 35px;
    border-color: #292929;
    background-color: rgb(208 136 136);
    @media (max-width: 768px) {
      bottom: 281px;
      width: 53%;
      left: 23%;
      border: 2px solid rgb(41 41 41);
      border-radius: 35px;
      background-color: rgb(212, 151, 151);
    }
  }
  button:hover {
    background-color: #521818;
    transition: 2s;
  }
`;
const Fundo = styled.div`
  img {
    position: absolute;
    width: 100%;
    height: 1350px;
  }
`;
const ContainerCenter = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  height: 1300px;
  background: black;
`;
const ListItemContainer = styled.li`
  width: 100%;

  position: relative;
  height: 400px;
  background-color: rgb(56 46 37);
  margin-top: 100px;
  border: 1px solid #edeced;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 20px 10px;
  color: #edeced;
  @media (max-width: 768px) {
    width: 92%;
    height: 800px;
    justify-content: inherit;
    margin-left: 2%;
    p {
      margin-top: 20px;
    }
  }

  h2 {
    color: #ff6d25;
    font-size: 28px;
    font-family: "Permanent Marker", cursive;
    margin-left: 10px;
  }
  div {
    width: 100%;
    max-width: 780px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      padding-top: 10px;
      font-size: 26px;
    }
    img {
      position: absolute;
      width: 40%;
      left: 600px;
      top: 60px;
      @media (max-width: 768px) {
        position: absolute;
        width: 300px;
        left: 30px;
        top: 459px;
        bottom: 0px;
      }
    }
  }
`;

export default Propostas;
