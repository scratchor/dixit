import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset-advanced';

const GlobalStyle = createGlobalStyle`
  ${reset}
  {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
