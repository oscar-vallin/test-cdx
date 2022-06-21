import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { useSessionStore } from '../store/SessionStore';

const defaultProps = {};

type AuthenticatedRouteProps = {
  children?: ReactElement | string;
  exact?: boolean;
  path?: string;
} & typeof defaultProps;

export const AuthenticatedRoute = ({ children, ...rest }: AuthenticatedRouteProps): ReactElement => {
  const { status } = useSessionStore();

  return <Route {...rest}>{status.isAuthenticated && children}</Route>;
};

AuthenticatedRoute.defaultProps = defaultProps;

export default AuthenticatedRoute;
