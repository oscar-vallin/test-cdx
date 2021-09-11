import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSessionStore } from '../store/SessionStore';

export default function AuthenticatedRoute({ children, ...rest }) {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { status } = useSessionStore();

  useEffect(() => {
    if (!status.isAuthenticated) {
      history.push(`/login?redirect=${pathname}${search}`);
    }
  }, [status.isAuthenticated]);

  return <Route {...rest}>{children}</Route>;
}
