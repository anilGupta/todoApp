import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './stores/stores';
import Routes from './routes';
import theme from './constants/Theme';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    //font-size: 15px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1em;
    line-height: 2;
    font-family: 'Open Sans', sans-serif !important;
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

const store = configureStore();
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <StyledPage>
              <BrowserRouter>
                <Component />
              </BrowserRouter>
            </StyledPage>
            <GlobalStyle />
          </div>
        </ThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Routes);

module.hot.accept('./routes', () => {
  render(Routes);
});
