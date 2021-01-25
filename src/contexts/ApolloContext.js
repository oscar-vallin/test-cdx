import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const SERVER_URL = 'https://x1-terraform-loadbalancer.k2u.xyz/graphql/';

//
export const ApolloContext = React.createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isContextLoading, setLoading] = React.useState(true);
  const [bearerToken, setBearerToken] = React.useState();

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    setBearerToken(token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({ uri: SERVER_URL });

  let client = new ApolloClient({
    // link,
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  const configureApollo = () => {
    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('AUTH_TOKEN');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const httpLink = new HttpLink({ uri: SERVER_URL });

    const _client = new ApolloClient({
      // link,
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    //
    client = _client;
  };

  // Con

  // Component Did Mount
  React.useEffect(() => {
    const localFunction = async () => {
      setLoading(false);

      configureApollo();
    };

    localFunction();
  }, []);

  // useEffects Variables.

  // Local Functions shared in Context.
  const onUpdate = async () => {};

  // Local Functions shared in Context.
  const loadToken = (token) => {
    console.log('ApolloContext - Token: ', token);
    console.log('ApolloContext - bearerToken: ', bearerToken);
    if (!!token && !!bearerToken && token !== bearerToken) {
      configureApollo();
      setBearerToken(token);
    }
  };

  //
  const values = React.useMemo(() => ({ isContextLoading, client, onUpdate, loadToken }), [isContextLoading, client]);

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
