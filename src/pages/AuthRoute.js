import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';
import { GenericErrorBoundary } from '../containers/boundaries';

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuthContext();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        <ErrorBoundary FallbackComponent={GenericErrorBoundary}>{children}</ErrorBoundary>
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
