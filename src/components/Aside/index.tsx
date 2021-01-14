import React from 'react';

import Logo from '../../assets/logo.svg';

import { 
  Container, 
  Header, 
  LogoImg, 
  MenuContainer,
  MenuItemLink,
  Title
} from './styles';

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md';

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={Logo} alt="Logo My Dashboard"/>
        <Title>My DashBoard</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/dashboard">
          <MdDashboard/>
          Dashboard
        </MenuItemLink>

        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward/>
          Entradas
        </MenuItemLink>

        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward/>
          Saídas
        </MenuItemLink>

        <MenuItemLink href="#">
          <MdExitToApp/>
          Sair
        </MenuItemLink>

      </MenuContainer>
    </Container>
  );
}

export default Aside;
