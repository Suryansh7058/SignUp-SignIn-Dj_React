import { createGlobalStyle } from 'styled-components';
import { keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
    box-sizing: border-box;
}

html {
    font-family: cursive,'Noto Sans JP', sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;

}
#main {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}


`;

export default GlobalStyle;
