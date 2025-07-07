import React from "react";
import TestChecker from "./features/TestChecker";
import Container from "./common/Container";
import LanguageSwitcher from "./features/LanguageSwitcher";

const App: React.FC = () => {
  return (
    <Container>
      <LanguageSwitcher />
      <TestChecker />
    </Container>
  );
};

export default App;