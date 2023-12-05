import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './components/Slicer/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
    </Router>
);

reportWebVitals();
