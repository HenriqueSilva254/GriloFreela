import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import CriateService from "./pages/CriateService"
import UserProvider from "./contexts/userContext"
import Propostas from "./pages/Proposta"
import Meuservicos from "./pages/MeuServico"

export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/criar/servico" element={<CriateService />} />
          <Route path="/proposta/:id" element={<Propostas />} />
          <Route path="/Meus/Servicos" element={<Meuservicos />} />
        </Routes>
      </UserProvider>  
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  width: 100%;
  height: 100%;
`
