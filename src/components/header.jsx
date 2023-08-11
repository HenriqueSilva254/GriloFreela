import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";


export default function Headers() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  function logout() {
    localStorage.clear();
    setUser();
    navigate("/");
  }

  return (
    <Header>
      <div>
        <Link to="/HomePage"><h1>GrilloServices</h1></Link>
        <BiExit onClick={logout} />
      </div>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  font-size: 26px;
  background-color: #262121;
  color: white;
  div {
    height: 40px;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  a{
    padding: 0;
    h1{
        margin: 0;
    }
  }
`;
