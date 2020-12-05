import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantContextProvider from './context';

ReactDOM.render(
  <RestaurantContextProvider>
    <Router>
      <App />
    </Router>
  </RestaurantContextProvider>,
  document.querySelector('#root')
);
