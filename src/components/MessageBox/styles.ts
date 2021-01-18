import styled, { keyframes } from 'styled-components';

const animate = keyframes`
  0% {
    transform: translatex(-100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translatex(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 49%;
  height: 260px;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;

  margin: 10px 0;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  animation: ${animate} .5s;

  > header img {
    width: 35px;
    margin-left: 7px;
  }

  > header p {
    font-size: 18px;
  }

  @media(max-width: 770px) {
    width: 100%;
    height: 150px;
    margin: 5px 0;

    > header h1 {
      font-size: 24px;

      img {
        width: 25px;
        height: 25px;
      }
    }

    > header p, > footer span {
      font-size: 14px;
    } 
  }

  @media(max-width: 420px) {
    
  }
`;
