import { thunkOn, createStore, persist } from 'easy-peasy';

import { ApplicationStore } from './ApplicationStore';
import { SessionStore } from './SessionStore';
import { ActiveDomainStore } from './ActiveDomainStore';
import { ThemeStore } from './ThemeStore';
import { QueryParamStore } from './QueryParamStore';

const onSetCurrentSession = (store) => store.SessionStore.setCurrentSession;

const resetStores = async (actions, target, { getStoreActions }) => {
  const StoreActions = await getStoreActions();

  if (!target.payload.token) {
    StoreActions.ApplicationStore.reset();
    StoreActions.ActiveDomainStore.reset();
    StoreActions.ThemeStore.reset();
    StoreActions.QueryParamStore.reset();
  }
};

const model = {
  ThemeStore,
  QueryParamStore,
  ApplicationStore,
  SessionStore: persist(SessionStore),
  ActiveDomainStore: persist(ActiveDomainStore),
  onSessionChange: thunkOn(onSetCurrentSession, resetStores),
};

const store = createStore(model);

export default store;
