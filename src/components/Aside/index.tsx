import React from 'react';

import Logo from '../../assets/logo.svg';

import { useAuth } from  '../../hooks/auth';

import { 
  Container, 
  Header, 
  LogoImg, 
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton
} from './styles';

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp
} from 'react-icons/md';

const Aside: React.FC = () => {

  const { signOut } = useAuth();

  return (
    <Container menuIsOpen={false}>
      <Header>
        <LogoImg src={Logo} alt="Logo My Dashboard"/>
        <Title>My DashBoard</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
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

        <MenuItemButton onClick={ signOut }>
          <MdExitToApp/>
          Sair
        </MenuItemButton>

      </MenuContainer>
    </Container>
  );
}

export default Aside;
