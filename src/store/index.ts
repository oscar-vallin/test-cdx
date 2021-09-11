import { createStore, persist } from 'easy-peasy';
import ThemeStore from './ThemeStore';
import ActiveOrgStore from './ActiveOrgStore';
import AuthStore from './AuthStore';
import QueryParamStore from './QueryParamStore';
import { SessionStore } from './SessionStore';

const model = {
  AuthStore,
  ThemeStore,
  ActiveOrgStore,
  QueryParamStore,
  SessionStore: persist(SessionStore),
};

const store = createStore(model);

export default store;
