import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Auth from "../services/apiAuth"
import { UserContext } from "../contexts/userContext"
import SamuraiLogo from "../components/samuraiLogo"


export default function SignInPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  // function para fazer login
  function HeadLogin(e) {
    e.preventDefault()
    const body = { email, password }
    Auth.signIn(body)
      .then(res => {
        console.log(res)
        const { token, name } = res.data
        localStorage.setItem("user", JSON.stringify({ token, name }))
        setUser(JSON.parse(localStorage.getItem("user")))
        navigate("/HomePage")
      }
      )
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 404 ) alert("email ou senha inválida")
        else {
          console.log(err.response.data)
          alert("email ou senha invalidos")
        }


      })
  }

  // layout da page login
  return (
    
    <SingInContainer>
      
      <form onSubmit={HeadLogin}>
        <SamuraiLogo />
        <input
          data-test="email"
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

        <button data-test="sign-in-submit" >Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  background-image: url("");
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
    font-size: 18px;
    color: black;
    font-weight: 200;
  }                         

  button{
    background-color:rgb(130 10 9);
  }
  input:hover{
    background-color: #f09999;
    transition: 2s;
  }
`

