import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

//
export const ApolloContext = React.createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isContextLoading, setLoading] = React.useState(true);

  const httpLink = new HttpLink({
    // uri: 'http://localhost:4000/',
    uri: 'https://x1-terraform-loadbalancer.k2u.xyz/graphql/',
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

  const authLink = setContext((_, { headers }) => {
    const auth = localStorage.getItem('k2u-auth');

    return {
      headers: {
        ...headers,
        authorization: auth ? `Bearer ${JSON.parse(auth).token}` : "",
      }
    }
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
    link: authLink.concat(link),
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

  //
  const values = React.useMemo(() => ({ isContextLoading, client, onUpdate }), [isContextLoading, client]);

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
