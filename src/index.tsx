import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { StoreProvider } from 'easy-peasy';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloContextProvider } from './contexts/ApolloContext.js';
import { ThemeContextProvider } from './contexts/ThemeContext.js';
import { AuthContextProvider } from './contexts/AuthContext.js';
import { SessionContextProvider } from './contexts/SessionContext.js';
import { NotificationContextProvider } from './contexts/NotificationContext.js';
import { UserDomainContextProvider } from './contexts/UserDomainContext.js';
import store from './store/index';

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <ApolloContextProvider>
      <StoreProvider store={store}>
        <Router>
          <SessionContextProvider>
            <UserDomainContextProvider>
              <ThemeContextProvider>
                <NotificationContextProvider>
                  <App />
                </NotificationContextProvider>
              </ThemeContextProvider>
            </UserDomainContextProvider>
          </SessionContextProvider>
        </Router>
      </StoreProvider>
    </ApolloContextProvider>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
