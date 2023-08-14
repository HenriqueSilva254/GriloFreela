import styled from "styled-components"
import samurai from "../img/samurai.webp"

export default function SamuraiLogo() {
    return (
        <Logo>
        <img src={samurai} alt="" />
        <h1>Get Samurai</h1>
        </Logo>
    )
}

const Logo = styled.div`
margin-top: 30px;
    h1{
    font-family: 'Permanent Marker', cursive;
    font-weight: 400;
    font-size: 62px;
    color: #4e0000;
    @media(max-width: 768px){
        font-size: 42px;
    }
    }
   
    img{
    width: 400px;

    @media(max-width: 768px) {
      width: 300px;
    }
  } 
`

