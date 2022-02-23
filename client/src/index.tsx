import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Axios from 'axios';
import API_URL from './utils/config';

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = API_URL;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.post['Access-Control-Allow-Origin'] =
  API_URL;


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
