import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colors.primary};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 30px;

  > h3 {
    color: ${props => props.theme.colors.white};
    font-size: 36px;

    margin-left: 10px;
  }

  > img {
    width: 35px;
    height: 35px;
  }
`;

export const Form = styled.form`
  width: 450px;
  height: 365px;

  padding: 35px;

  border-radius: 10px;
  box-shadow: 0 2px 5px ${props => props.theme.colors.secondary};

  background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 35px;
  font-size: 36px;
  color: ${props => props.theme.colors.white};

  &:after {
    content: '';
    display: block;
    width: 65px;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }
`;
