import React from 'react';

import SelectInput from '../SelectInput';
import {
  Container,
  TitleContainer,
  Controllers
} from './styles';

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  title, lineColor, children
}) => {

  const options = [
    {value: 'Rogrigo', label: 'Rodrigo'},
    {value: 'Maria', label: 'Maria'},
    {value: 'Ana', label: 'Ana'},
  ]

  return (
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1>{title}</h1>
      </TitleContainer>
      <Controllers>
        {children}
      </Controllers>
    </Container>
  );
}

export default ContentHeader;
