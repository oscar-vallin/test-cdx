import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated, authData } = useAuthContext();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}
