import { thunkOn, createStore, persist } from 'easy-peasy';
import ThemeStore from './ThemeStore';
import ActiveOrgStore from './ActiveOrgStore';
import QueryParamStore from './QueryParamStore';

import { SessionStore } from './SessionStore';
import { ActiveDomainStore } from './ActiveDomainStore';

const onSetCurrentSession = (store) => store.SessionStore.setCurrentSession;

const resetStores = async (actions, target, { getStoreActions }) => {
  const StoreActions = await getStoreActions();

  if (!target.payload.token) {
    StoreActions.ActiveDomainStore.reset();
  }
};

const model = {
  ThemeStore,
  ActiveOrgStore,
  QueryParamStore,
  SessionStore: persist(SessionStore),
  ActiveDomainStore: persist(ActiveDomainStore),
  onSessionChange: thunkOn(onSetCurrentSession, resetStores),
};

const store = createStore(model);

export default store;
