import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { ApolloContextProvider } from './contexts/ApolloContext.js';
import { ThemeContextProvider } from './contexts/ThemeContext.js';

ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloContextProvider> */}
    <ThemeContextProvider>
      <Router>
        <App />
      </Router>
    </ThemeContextProvider>
    {/* </ApolloContextProvider> */}
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
