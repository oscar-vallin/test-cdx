import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

//
export const ApolloContext = React.createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isApolloLoading, setLoading] = React.useState(true);
  const [sessionID, setSessionID] = React.useState('');

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
        'x-auth-token': sessionID ? `Bearer ${sessionID}` : '',
      },
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    console.log('afterware link');
    return forward(operation).map((response) => {
      const context = operation.getContext();

      const authHeader = context.response.headers.get('x-auth-token');

      const { headers, status } = context.response;

      console.log('status code: ', status);
      console.log('headers: ', headers);

      if (headers) {
        console.log('Headers are there');
        const yourHeader = headers.get('yourHeader');

        console.log('is ???', headers.get('x-auth-token'));
      }

      // We would see this log in the SSR logs in the terminal
      // but in the browser console it would always be null!

      if (authHeader) {
        // cut off the 'Bearer ' part from the header
        SESSION_ID = authHeader.replace('Bearer ', '');

        setSessionID(SESSION_ID); // save sessionID, e.g. in a cookie
      }

      return response;
    });
  });

  console.log('session ', sessionID);

  let client = new ApolloClient({
    link: afterwareLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
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
