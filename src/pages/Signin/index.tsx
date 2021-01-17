import React, { useState } from 'react';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Logo,
  Form,
  FormTitle
} from './styles';

const Signin: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="My Dashboard" />
        <h3>My Dashboard</h3>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>

        <Input
          required
          type="email"
          placeholder="e-mail"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Input
          required
          type="password"
          placeholder="senha"
          onChange={({ target: { value } }) => setPassword(value)}
        />

        <Button type="submit">
          Acessar
        </Button>
      </Form>
    </Container>
  );
}

export default Signin;
