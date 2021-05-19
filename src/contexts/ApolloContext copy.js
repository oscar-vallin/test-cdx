import React from 'react';
import { ApolloProvider, ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

// *
// *
// *
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('AUTH_TOKEN');

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
      original: 'Version AuthLink',
      Cookie:
        'AWSALB=NXLQf+YfefiffYyhR0E/zigZdgsJ5jaJw0y8qz25mx86G76GvyKg1AEisT4WSBTIVXGH2WEt0dvHJDi6340wN5v8ZL5IziDZrcmiM2w3q2t+R7vZ/oeAKxc/vXrs; Expires=Fri, 16 Apr 2021 04:06:33 GMT; Path=/',
      // Set-Cookie: 'AWSALBCORS=NXLQf+YfefiffYyhR0E/zigZdgsJ5jaJw0y8qz25mx86G76GvyKg1AEisT4WSBTIVXGH2WEt0dvHJDi6340wN5v8ZL5IziDZrcmiM2w3q2t+R7vZ/oeAKxc/vXrs; Expires=Fri, 16 Apr 2021 04:06:33 GMT; Path=/; SameSite=None; Secure',
      // Set-Cookie: JSESSIONID=4BCFC50C838E2B0DB367165B0B999C2A; Path=/; HttpOnly
      // Set-Cookie: XSRF-TOKEN=060dc907-7655-4f36-be42-68ecf649bd58; Path=/; HttpOnly
    },
    credentials: 'same-origin',
  };
});

// *
// *
// *
const addDateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response;
  });
});

//
export const ApolloContext = React.createContext(() => {
  // Initialization
  // i18n.changeLanguage(localStorage.getItem('local.language'));
});

export const ApolloContextProvider = ({ children }) => {
  // LocalState
  const [isContextLoading, setLoading] = React.useState(true);
  // const [client, setClient] = React.useState(
  //   new ApolloClient({
  //     // link,
  //     link: authLink.concat(httpLink),
  //     cache: new InMemoryCache(),
  //     connectToDevTools: true,
  //   })
  // );

  const httpLink = new HttpLink({ uri: SERVER_URL });

  let client = new ApolloClient({
    // link,
    link: authLink.concat(addDateLink.concat(httpLink)),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  // *
  // *
  // *
  const configureApollo = () => {
    const _httpLink = new HttpLink({ uri: SERVER_URL });

    const _client = new ApolloClient({
      // link,
      link: authLink.concat(addDateLink.concat(_httpLink)),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
export function useApolloContext() {
  const context = React.useContext(ApolloContext);

  return context;
}
