import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App.jsx';

import { StateProvider, initialState } from './State';

import mainReducer from "./store/reducers/index.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider reducer={mainReducer} initialState={initialState}>
    {/*<App /> */} 
  </StateProvider>

//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
);
