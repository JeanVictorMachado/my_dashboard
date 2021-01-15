import React from 'react';

import { Container, ToggleLabel, ToggleSwitch } from './styles';

const Toggle: React.FC = ({
  labelLeft,
  labelRight,
  checked,
  onChange
}) => (
  <Container>
    <ToggleLabel>{labelLeft}</ToggleLabel>
    <ToggleSwitch
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
    />
    <ToggleLabel>{labelRight}</ToggleLabel>
  </Container>
);

export default Toggle;
