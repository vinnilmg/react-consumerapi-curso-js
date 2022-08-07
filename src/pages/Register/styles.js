import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-family: Verdana;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid ${colors.primaryDarkColor};
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;

    &:focus {
      border: 1px solid blue;
    }
  }
`;
