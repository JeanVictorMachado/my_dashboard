import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;

  margin: 12px 0 0 0;
  padding: 10px 10px;

  border-radius: 5px;

  font-weight: bold;
  font-size: 24px;

  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.warning};

  transition: opacity .3s;

  &:hover {
    opacity: .7;
  }
`;