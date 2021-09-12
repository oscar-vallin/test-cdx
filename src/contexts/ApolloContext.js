import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

//
export const ApolloContext = createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isApolloLoading, setLoading] = useState(true);

  let authToken = localStorage.getItem('AUTH_TOKEN');

  const httpLink = new HttpLink({
    uri: SERVER_URL,
    // credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'x-auth-token': authToken ? `${authToken}` : '',
      },
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();

      const { headers } = context.response;

      if (headers) {
        const authHeader = headers.get('x-auth-token');
        if (authHeader) {
          authToken = authHeader;
          localStorage.setItem('AUTH_TOKEN', authHeader);
        }
      }

      return response;
    });
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const client = new ApolloClient({
    link: afterwareLink.concat(authLink.concat(httpLink)),
    // cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  // Component Did Mount
  useEffect(() => {
    const localFunction = () => {
      // tokenFunc();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      authToken = localStorage.getItem('AUTH_TOKEN');
      setLoading(false);
    };

    localFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({ isApolloLoading, client }), [isApolloLoading, client]);

  // Finally, return the interface that we want to expose to our other components
  return (
    <ApolloProvider client={client}>
      <ApolloContext.Provider value={values}>{children}</ApolloContext.Provider>
    </ApolloProvider>
  );
};

//
export function useApolloContext() {
  const context = useContext(ApolloContext);

  return context;
}
