import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import configureStore from "./stores/stores";
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";
import { theme } from './constants/Theme';

createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Open Sans', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'Open Sans', sans-serif; }
`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;


const store = configureStore();
const render = (Component) => {
  ReactDOM.render(<AppContainer>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <StyledPage>
                <Inner>
                  <Component />
                </Inner>
              </StyledPage>
            </ThemeProvider>
          </Provider>
      </AppContainer>,document.getElementById('root')
  );
};

render(Routes);

module.hot.accept('./routes', () => {
  render(Routes)
});
