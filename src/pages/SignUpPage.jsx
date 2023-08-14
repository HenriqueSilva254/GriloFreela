import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import Auth from "../services/apiAuth"
import SamuraiLogo from "../components/samuraiLogo";


export default function SignUpPage() {
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate()

  // function para fazer login
  function HeadSignUp(e){
  e.preventDefault()
  const body = {name, email, password, confirmPassword, cidade, telefone}
  console.log(body)
  if(password !== confirmPassword) alert("senhas não conferem")
  else{
    Auth.signUp(body)
    .then(res => {
      navigate("/")
      console.log(res)
    }
    )
    .catch(err => {
      //if(err.response.status === 409) alert("email já cadastrado, tente outro")
      console.log(err.response.data)  
    })
  }
  }

  return (
    <SingUpContainer>
      <form onSubmit={HeadSignUp}>
        <SamuraiLogo />
        <input 
        placeholder="Nome Completo" 
        type="text" 
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        placeholder=" xxxxx-xxxx" 
        type="number" 
        pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
        required
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        />
        <input 
        placeholder="Cidade onde mora" 
        type="text" 
        required
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        />
        <input 
        placeholder="E-mail" 
        type="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        data-test="password"
        placeholder="Senha" 
        type="password" 
        autoComplete="new-password" 
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <input 
        data-test="conf-password"
        placeholder="Confirme a senha" 
        type="password" 
        autoComplete="new-password" 
        required
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form{
    width: 77%;
  }
  a{
    font-family: sans-serif;
    font-size: 22px;
    color: black;
    font-weight: 200;
    @media(max-width: 768px) {
      font-size: 18px;
      margin-bottom: 30px;
    }
  }
  input:hover{
    background-color: #f09999;
    transition: 2s;
  }
  button{
    background-color:rgb(130 10 9);
  }
`
