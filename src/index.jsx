import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './indexStyled';

import App from './App';

const app = (
  <Wrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Wrapper>
);

ReactDOM.render(app, document.getElementById('root'));

module.hot.accept();
