import styled from 'styled-components';

interface ITitleContainerProps {
  lineColor: string;
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 25px;

  display: flex;
  justify-content: space-between;

  @media(max-width: 330px) {
    display: flex;
    flex-direction: column;
  }
`;

export const TitleContainer = styled.div<ITitleContainerProps>`

  > h1 {
    color: ${props => props.theme.colors.white};
  
    &::after {
      content: '';
      display: block;
      width: 55px;
      border-bottom: 10px solid ${props => props.lineColor};
    }
  }

  @media(max-width: 430px) {
    > h1 {
      font-size: 24px;

      &::after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 7px solid ${props => props.lineColor};
      }
    }
  }
`;

export const Controllers = styled.div`
  display: flex;

  @media(max-width: 330px) {
    width: 100%;
    margin-top: 20px;

    justify-content: space-around;
  }
`;
