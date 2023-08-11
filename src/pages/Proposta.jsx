import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import services from "../services/apiServices";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Headers from "../components/header";

function Propostas() {
  const { user } = useContext(UserContext);
  const [oferta, setOferta] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if(!user) {
        alert("Faça login");
        navigate("/");
      } else {
    services.getServiceId(user.token, id)
    .then(res => {
        console.log(res.data)
        setOferta(res.data)
    })
    .catch(err => console.log(err))
    }
  }, []);
  return (
    <Container>
      <Headers/>
        <ContainerCenter>
        <ListItemContainer>
          <h2>{oferta.titulo}</h2>
          <div>
            <p>{oferta.descricao}</p>
            <p>Cliente: {oferta.name}</p>
            <p>Categoria: {oferta.categoria} </p>
            <p>Experiencia: {oferta.experiencia}</p>
          </div>
          <h3>Publicado em: {oferta.datapostagem}</h3>
        </ListItemContainer>
        <PropostasForm>
        <label for="titulo">Criar Proposta para este projeto</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              required
              onChange={(e) => setTitulo(e.target.value)}
            />
        </PropostasForm>
        </ContainerCenter>
    </Container>
  );
}
const Container = styled.main`
    width: 100%;
`
const ContainerCenter = styled.div`
   width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`
const ListItemContainer = styled.li`
  height: 100%;
  background-color: #fcf5f7;
  margin-top: 5px;
  border: 1px solid #edeced;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 20px 10px;
  h2 {
    color: #7171e7;
    font-size: 28px;
    height: 30px;
  }
  div {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      font-size: 20px;
    }
  }
`;

export default Propostas
