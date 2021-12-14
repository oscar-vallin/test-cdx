import { ReactElement, ReactNode, createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSessionStore } from '../store/SessionStore';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

//
export const ApolloContext = createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

const defaultProps = {
  // children: '',
};

type ApolloContextProviderProps = {
  children?: ReactElement | ReactNode | string;
} & typeof defaultProps;

export const ApolloContextProvider = ({ children }: ApolloContextProviderProps): ReactElement => {
  const SessionStore = useSessionStore();
  // LocalState
  const [isApolloLoading] = useState(true);
  // const [sessionID, setSessionID] = useState('');

  const httpLink = new HttpLink({
    uri: SERVER_URL,
    // credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    let authToken = SessionStore.user.token || '';
    if (authToken.trim().length == 0) {
      authToken = window.sessionStorage.getItem('_initSession') || '';
    }

    return {
      headers: {
        ...headers,
        'x-auth-token': authToken,
        'X-XSRF-Token': document.head?.querySelector('meta[name="_csrf"]')?.getAttribute('content') || '',
      },
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
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
      // authToken = await localStorage.getItem('AUTH_TOKEN');
      // setLoading(false);
    };

    localFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values: any = useMemo(() => ({ isApolloLoading, client }), [isApolloLoading, client]);

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

ApolloContextProvider.defaultProps = defaultProps;
