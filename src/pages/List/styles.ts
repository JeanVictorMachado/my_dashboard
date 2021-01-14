import styled from 'styled-components';

interface ITitleContainerProps {
  lineColor: string;
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

export const TitleContainer = styled.div<ITitleContainerProps>`

  > h1 {
    color: ${props => props.theme.colors.white};
  
    &::after {
      content: '';
      width: 55px;
      border-bottom: 10px solid ${props => props.lineColor};

      display: block;
    }
  }
`;


export const Content = styled.main`

`;

export const Filters = styled.div`
  width: 100%;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    margin: 0 10px;
    background: none;
    color: ${props => props.theme.colors.white};

    transition: opacity .3s;
    opacity: .4;

    &:hover {
      opacity: .7;
    }
  }

  .tag-filter-recurrent::after {
    content: '';
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.success};

    display: block;
  }

  .tag-filter-eventual::after {
    content: '';
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.warning};

    display: block;
  }

  .tag-actived {
    opacity: 1;
  }
`;
