import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react';
import '@fluentui/react/dist/css/fabric.css';
import { StoreProvider } from 'easy-peasy';

import MetaTags from 'react-meta-tags';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloContextProvider } from './contexts/ApolloContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SessionContextProvider } from './contexts/SessionContext';
import { ActiveDomainContextProvider } from './contexts/ActiveDomainContext';
import { NotificationContextProvider } from './contexts/NotificationContext';
import store from './store';

initializeIcons();

ReactDOM.render(
  <>
    <MetaTags>
      <title>CDX</title>
      <meta id="__csrf_token" name="_csrf" content="" />
    </MetaTags>
    <React.StrictMode>
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <SessionContextProvider>
              <ActiveDomainContextProvider>
                <ThemeContextProvider>
                  <NotificationContextProvider>
                    <App />
                  </NotificationContextProvider>
                </ThemeContextProvider>
              </ActiveDomainContextProvider>
            </SessionContextProvider>
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    </React.StrictMode>
  </>,
  document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
