import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { tokenHelper } from '../helpers/tokenHelper';
import { useCurrentUser } from './hooks/useCurrentUser';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

//
export const ApolloContext = React.createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isApolloLoading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState('');

  let tokenXCSR;

  const httpLink = new HttpLink({
    uri: SERVER_URL,
    // fetchOptions: { method: 'GET' },
    credentials: 'include',
  });

  const ErrorLink = onError(({ networkError, operation, forward }) => {
    if (networkError.statusCode === 403) {
      console.log('Verify its coming 403');

      tokenXCSR = tokenHelper();
    }
  });

  const authLink = setContext(async (request, previousContext, headers) => ({
    headers: { ...headers, 'X-XSRF-TOKEN': await tokenXCSR },
  }));

  let client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ErrorLink.concat(authLink.concat(httpLink)),
  });

  // Component Did Mount

  React.useEffect(() => {
    const localFunction = async () => {
      // tokenFunc();
      setLoading(false);

      // configureApollo();
    };

    localFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = React.useMemo(() => ({ isApolloLoading, client }), [isApolloLoading, client]);

  // Finally, return the interface that we want to expose to our other components
  return (
    <ApolloProvider client={client}>
      <ApolloContext.Provider value={values}>{children}</ApolloContext.Provider>
    </ApolloProvider>
  );
};

//
export function useApolloContext() {
  const context = React.useContext(ApolloContext);

  return context;
}
