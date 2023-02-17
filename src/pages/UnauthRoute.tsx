import { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSessionStore } from '../store/SessionStore';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

type UnauthenticatedRouteProps = {
  children?: ReactElement | string;
  path?: string;
};

export const UnauthenticatedRoute = (
  { children, ...rest }: UnauthenticatedRouteProps,
): ReactElement => {
  const { status } = useSessionStore();
  const redirect = querystring('redirect');

  return (
    <Route {...rest}>
      {!status.isAuthenticated ? children : <Redirect to={redirect === '' || redirect === null ? '/' : redirect} />}
    </Route>
  );
};

export default UnauthenticatedRoute;
