import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloContextProvider } from './contexts/ApolloContext.js'

ReactDOM.render(
  <React.StrictMode>
    <ApolloContextProvider>
      <App />
    </ApolloContextProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
