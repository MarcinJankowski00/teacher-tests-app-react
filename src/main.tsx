import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from "styled-components";
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalStyle from "./GlobalStyle";
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);