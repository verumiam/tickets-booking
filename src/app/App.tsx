import React from 'react';
import {TicketList} from "../entities";
import {createGlobalStyle} from "styled-components";
import {Layout} from "../shared";
import {TicketsFilter} from "../features";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Rubik', 'sans-serif';
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--color-light-blue);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  html {
    --color-orange: #F58025;
    --color-white: #FFFF;
    --color-black: #1C1C1C;
    --color-dark-grey: #A9A9A9;
    --color-light-grey: #C0C0C0;
    --color-light-blue: #E1F5FE;
    --color-dark-blue: #4FC3F7;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`

function App() {
  return (
    <div className="App">
        <GlobalStyles/>
        <Layout>
            <TicketsFilter/>
            <TicketList/>
        </Layout>
    </div>
  );
}

export default App;
