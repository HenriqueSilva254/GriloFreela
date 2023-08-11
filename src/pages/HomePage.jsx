import styled from "styled-components"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import services from "../services/apiServices"
import Headers from "../components/header"


// henri254@gmail.com
export default function HomePage() {
  const { user, setUser } = useContext(UserContext)
  const [ofertas, setOfertas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      alert("Faça login")
      navigate("/")
    }else{
      services.getAllServices(user.token)
      .then(res => {
      setOfertas([...res.data])
      })
      .catch(err => console.log(err))

      
    } 
    
  } ,[])
  return (
    <HomeContainer>
      <Headers/>
      <ImagemCabecario>
        <DarkOverlay><h1>Encontre um profissional para seu negócio</h1></DarkOverlay>
      </ImagemCabecario>
      <TransactionsContainer>

        <ul>
          {ofertas.map(service => (
            <ListItemContainer>
             <h2>{service.titulo}</h2>
             <div>
              <p><strong>Servico prestado por:</strong> {service.name}</p>
              <p><strong>Descricao:</strong> {service.descricao} </p>
              <img src={service.imagem} alt="" />
              <p><strong>Telefone:</strong> {service.telefone}</p>
              <p><strong>Cidade: </strong>{service.cidade}</p>
             </div>
             <p><strong>Publicado em</strong>: {new Date(service.datapostagem).toLocaleDateString()}</p>
             
            </ListItemContainer>
          ))}

        </ul>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income" onClick={() => {navigate('/criar/servico')}}>
          <AiOutlinePlusCircle />
          <p>Criar <br /> Serviço</p>
        </button>
        <button data-test="new-expense" onClick={() => {navigate('/nova-transacao/saida')} }>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}


const ImagemCabecario = styled.div`
    position: relative;
    background-image: url('https://cdn.wizard.com.br/wp-content/uploads/2020/05/06155457/PJ-ou-CLT-qual-o-melhor-regime-de-trabalho.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 400px;
    @media (max-width: 768px) {
      height: 600px; /* Reduza a altura da imagem em telas menores */
    }
`
const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Camada escura com opacidade */
  h1{
    margin-top: 10%;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    font-size: 40px;
  }
  
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color:  rgba(0, 0, 0, 0.2);
  strong{
        font-size: 21px;
        font-weight: 700;
      }
`

const TransactionsContainer = styled.article`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  flex-grow: 1;
  color: #000;
  padding: 16px;
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
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
 width: 100%;
 position: relative;
 height: 100%;
 background-color: #fcf5f7;
 margin-top: 5px;
 border: 1px solid  #edeced;
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 align-items: start;
 justify-content: space-around;
 padding: 20px 10px;
 h2{
  color: #7171e7;
  font-size: 28px;
  height: 30px;
 }
 div{
  width: 100%;
  max-width: 780px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p{
  font-size: 20px;
  }
  img{
    position: absolute;
    width: 300px;
    left: 800px;
    top: 30px;
  }
 }

`