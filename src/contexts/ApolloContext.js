import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

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
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    // uri: 'http://localhost:4000/',
    uri: 'https://x1-terraform-loadbalancer.k2u.xyz/graphql/',
    options: {},
  });

  //
  const wsLink = new WebSocketLink({
    // uri: `ws://localhost:4000/graphql`,
    uri: `ws://x1-terraform-loadbalancer.k2u.xyz/graphql/`,
    options: {
      reconnect: false,
      timeout: 30000,
    },
  });

  //
  // const link = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  //   },
  //   wsLink,
  //   httpLink
  // );

  const link = httpLink;

  const client = new ApolloClient({
    // link,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  // Con

  // Component Did Mount
  React.useEffect(() => {
    const localFunction = async () => {
      setLoading(false);
    };

    localFunction();
  }, []);

  // useEffects Variables.

  // Local Functions shared in Context.
  const onUpdate = async () => {};

  // Local Functions shared in Context.
  const saveToken = (token) => {
    if (token) {
      setToken(token);
    } else {
      setToken(undefined);
    }
  };

  //
  const values = React.useMemo(() => ({ isContextLoading, client, onUpdate, saveToken }), [isContextLoading, client]);

  // Finally, return the interface that we want to expose to our other components
  return (
    <ApolloProvider client={client}>
      <ApolloContext.Provider value={values}>{children}</ApolloContext.Provider>
    </ApolloProvider>
  );
};

//
export function useLanguageContext() {
  const context = React.useContext(ApolloContext);

  return context;
}
