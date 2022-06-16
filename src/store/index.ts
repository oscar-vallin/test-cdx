import { createStore, persist, thunkOn, ThunkOn } from 'easy-peasy';

import { ApplicationStore } from './ApplicationStore';
import { SessionStore } from './SessionStore';
import { ActiveDomainStore } from './ActiveDomainStore';
import { ThemeStore } from './ThemeStore';
import { QueryParamStore } from './QueryParamStore';
import { ThemeModel } from 'src/store/ThemeStore/ThemeStore';
import { QueryParamModel } from 'src/store/QueryParamStore/QueryParamStore';
import { ApplicationModel } from 'src/store/ApplicationStore/ApplicationStore';
import { SessionModel } from 'src/store/SessionStore/SessionStore';
import { ActiveDomainModel } from 'src/store/ActiveDomainStore/ActiveDomainTypes';

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

export interface StoreModel {
  ThemeStore: ThemeModel;
  QueryParamStore: QueryParamModel;
  ApplicationStore: ApplicationModel;
  SessionStore: SessionModel;
  ActiveDomainStore: ActiveDomainModel;
  onSessionChange: ThunkOn<SessionModel>
}

const model: StoreModel = {
  ThemeStore,
  QueryParamStore,
  ApplicationStore,
  SessionStore: persist(SessionStore),
  ActiveDomainStore: persist(ActiveDomainStore),
  onSessionChange: thunkOn(onSetCurrentSession, resetStores),
};

const store = createStore(model);

export default store;
