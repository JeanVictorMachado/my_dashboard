import React, { useMemo } from 'react';

import emojis from '../../utils/emojis';
import Toogle from '../Toggle';

import { 
  Container,
  Profile,
  Welcome,
  UserName
} from './styles';

const MainHeader: React.FC = () => {

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toogle/>

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Rodrigo Gonçalves</UserName>
      </Profile>
    </Container>
  );
}

export default MainHeader;
