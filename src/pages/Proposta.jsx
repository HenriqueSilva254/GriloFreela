import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import services from "../services/apiServices";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Headers from "../components/header";

function Propostas() {
  const { user } = useContext(UserContext);
  const [service, setService] = useState([]);
  const { id } = useParams();
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
    <Container>
      <Headers />
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
    </Container>
  );
}
const Container = styled.main`
  width: 100%;
`;
const ContainerCenter = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;
const ListItemContainer = styled.li`
  width: 100%;

  position: relative;
  height: 400px;
  background-color: #fcf5f7;
  margin-top: 100px;
  border: 1px solid #edeced;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 20px 10px;
  @media (max-width: 768px) {
    height: 800px;
    justify-content: inherit;
    p {
      margin-top: 20px;
    }
  }

  h2 {
    color: #7171e7;
    font-size: 32px;
    height: 30px;
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
      width: 300px;
      left: 800px;
      top: 30px;
      @media (max-width: 768px) {
        position: absolute;
        width: 300px;
        left: 60px;
        top: 459px;
        bottom: 0px;
      }
    }
  }
`;

export default Propostas;
