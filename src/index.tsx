import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { StoreProvider } from 'easy-peasy';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloContextProvider } from './contexts/ApolloContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { UserDomainContextProvider } from './contexts/UserDomainContext';
import store from './store/index';

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <ApolloContextProvider>
      <StoreProvider store={store}>
        <AuthContextProvider>
          <ThemeContextProvider>
            <Router>
              <UserDomainContextProvider>
                <NotificationContextProvider>
                  <App />
                </NotificationContextProvider>
              </UserDomainContextProvider>
            </Router>
          </ThemeContextProvider>
        </AuthContextProvider>
      </StoreProvider>
    </ApolloContextProvider>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
