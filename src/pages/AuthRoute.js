import { Route } from 'react-router-dom';
import { useSessionStore } from '../store/SessionStore';

export default function AuthenticatedRoute({ children, ...rest }) {
  const { status } = useSessionStore();

  return <Route {...rest}>{status.isAuthenticated && children}</Route>;
}
