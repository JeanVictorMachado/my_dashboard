import styled, { keyframes } from 'styled-components';

interface ILegendProps {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translatex(100px);
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

  margin: 10px 0;

  border-radius: 7px;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  display: flex;

  animation: ${animate} .5s;

  @media(max-width: 770px) {
    width: 100%;
    height: 200px;
    margin: 5px 0;
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  > h2 {
    margin-bottom: 10px;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;
  height: 175px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 10px;
  }
`;

export const Legend = styled.li<ILegendProps>`
  margin-bottom: 7px;

  display: flex;
  align-items: center;

  > div {
    background-color: ${props => props.color};

    width: 55px;
    height: 55px;
    margin-top: 10px;
    border-radius: 5px;

    font-size: 18px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  > span {
    font-size: 18px;
    margin-left: 10px;
  }

  @media(max-width: 770px) {

    > div {
      height: 30px;
    }
  }
`;

export const SideRight = styled.main`
  height: 150px;
  height: 100%;
  padding: 10px 10px 25px 0;

  flex: 1;
  display: flex;
  justify-content: center;
`;
