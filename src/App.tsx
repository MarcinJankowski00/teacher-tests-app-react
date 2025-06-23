import React from "react";
import TestChecker from "./features/TestChecker";
import Container from "./common/Container";

const App: React.FC = () => {
  return (
    <Container>
      <TestChecker />
    </Container>
  );
};

export default App;