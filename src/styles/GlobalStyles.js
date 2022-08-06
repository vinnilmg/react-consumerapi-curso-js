import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: ${colors.primaryDarkColor};
  //color: ${colors.primaryColor};
}

html, body, #root {
  height: 100%;
}

button {
  cursor: pointer;
  background: ${colors.buttonColor};
  border: none;
  color: ${colors.primaryColor};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
}

a {
  text-decoration: none;
  background: ${colors.primaryColor};
}

ul {
  list-style: none;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background: ${colors.successColor};
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background: ${colors.errorColor};
}

`;

export const Container = styled.section`
  max-width: 360px;
  background: ${colors.primaryColor};
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
