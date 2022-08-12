import { useSessionStore } from '../store/SessionStore';

export const useCSRFToken = () => {
  const graphQLUrl = process.env.REACT_APP_API_SERVER;
  const serverUrl = graphQLUrl?.replace('/graphql', '/frsc') ?? '';

  const SessionStore = useSessionStore();

  const getCSRFToken = () => {
    return document.getElementById('__csrf_token')?.getAttribute('content');
  };

  const setCSRFToken = (token: string) => {
    document.getElementById('__csrf_token')?.setAttribute('content', token);
  };

  const getAuthToken = () => {
    return window.sessionStorage.getItem('_initSession');
  };

  const setAuthToken = (token: string) => {
    // Save the auth token in session storage which needs to be in a separate location than the CSRF token
    window.sessionStorage.setItem('_initSession', token);
  };

  const callCSRFController = async () => {
    const currentToken = getCSRFToken() || '';
    if (currentToken.trim().length === 0) {
      const authToken = SessionStore.user?.token || getAuthToken() || '';
      const opts: RequestInit = {
        headers: {
          'x-auth-token': authToken,
        },
        credentials: 'include',
      };

      // A CSRF token is tied to the session which is denoted by session ID
      // which is managed by the x-auth-token. So we need to send them in pairs.
      await fetch(serverUrl, opts)
        .then((res) => res.json())
        .then((result) => {
          setCSRFToken(result.csrfToken);
          setAuthToken(result.authToken);
        })
        .catch(() => {
          setCSRFToken('CSRF_RETRIEVAL_ERROR');
          setAuthToken('CSRF_RETRIEVAL_ERROR');
        });
    }
  };

  return { callCSRFController, getCSRFToken, setCSRFToken, getAuthToken, setAuthToken };
};
