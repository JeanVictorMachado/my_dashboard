import React from 'react';

import { Container, ToggleLabel, ToggleSwitch } from './styles';

const Toggle: React.FC = () => (

  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSwitch
      checked
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => {}}
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export default Toggle;
