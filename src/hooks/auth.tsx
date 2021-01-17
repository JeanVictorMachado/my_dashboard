import React, { createContext, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {

  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@my-dashboard:logged');

    return !!isLogged;
  });

  const signIn = (email: string, password: string) => {
    if (email === 'jeanvictor.arq@gmail.com' || password === '1234') {
      localStorage.setItem('@my-dashboard:logged', 'true');
      localStorage.setItem('@my-dashboard:email', email);

      setLogged(true);
    }
    else {
      alert('Senha ou usuário inválido!');
    }
  }

  const signOut = () => {
    localStorage.removeItem('@my-dashboard:logged');

    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
