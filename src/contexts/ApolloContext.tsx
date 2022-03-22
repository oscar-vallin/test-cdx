import { ReactElement, ReactNode, createContext, useState, useEffect, useMemo } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useWatchCSRFToken } from 'src/hooks/useWatchCSRFToken';
import { LoadingPage } from 'src/pages/Loading/LoadingPage';
import { useCSRFToken } from '../hooks/useCSRFToken';
import { createUploadLink } from "apollo-upload-client";

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
  bypassLoading?: boolean;
  children?: ReactElement | ReactNode | string;
} & typeof defaultProps;

export const ApolloContextProvider = ({ bypassLoading, children }: ApolloContextProviderProps): ReactElement => {
  // LocalState
  const [isApolloLoading] = useState(true);
  // const [sessionID, setSessionID] = useState('');

  const httpLink = new HttpLink({
    uri: SERVER_URL,
    // credentials: 'same-origin',
  });

  const { getCSRFToken, callCSRFController } = useCSRFToken();
  const { csrfTokenRetrieved } = useWatchCSRFToken();

  useEffect(() => {
    callCSRFController();
  }, []);

  const authLink = setContext((_, { headers }) => {
    return {
      credentials: 'include',
      headers: {
        ...headers,
        'X-XSRF-Token': getCSRFToken() || '',
      },
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      return response;
    });
  });

  const uploadLink = createUploadLink({ uri: SERVER_URL });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const client = new ApolloClient({
    link: ApolloLink.from([ authLink, afterwareLink, uploadLink]),
    //afterwareLink.concat(authLink.concat(httpLink)),
    // cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
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

  const renderBody = (hasToken: boolean) => {
    if (!hasToken && !bypassLoading) {
      return <LoadingPage />;
    }
    return (
      <ApolloProvider client={client}>
        <ApolloContext.Provider value={values}>{children}</ApolloContext.Provider>
      </ApolloProvider>
    );
  };

  // Finally, return the interface that we want to expose to our other components
  return renderBody(csrfTokenRetrieved);
};

ApolloContextProvider.defaultProps = defaultProps;
