import React from "react";
import styled from "styled-components";



function Footer() {
  return (
    <FooterContainer>
      <CompanyName>Get Samurai</CompanyName>
      <CopyrightText>&copy; 2023 Get Samurai. Todos os direitos reservados.</CopyrightText>
    </FooterContainer>
  );
}
const FooterContainer = styled.footer`
  background-color: rgb(38, 33, 33);
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const CompanyName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

export default Footer;
