import {
  createStore, persist, thunkOn, ThunkOn,
} from 'easy-peasy';

import { ThemeModel } from 'src/store/ThemeStore/ThemeStore';
import { QueryParamModel } from 'src/store/QueryParamStore/QueryParamStore';
import { ApplicationModel } from 'src/store/ApplicationStore/ApplicationStore';
import { SessionModel } from 'src/store/SessionStore/SessionStore';
import { ActiveDomainModel } from 'src/store/ActiveDomainStore/ActiveDomainTypes';
import { ApplicationStore } from './ApplicationStore';
import { SessionStore } from './SessionStore';
import { ActiveDomainStore } from './ActiveDomainStore';
import { ThemeStore } from './ThemeStore';
import { QueryParamStore } from './QueryParamStore';

const onLogout = (store) => store.SessionStore.logout;

const resetStores = async (actions, target, { getStoreActions }) => {
  const StoreActions = await getStoreActions();

  StoreActions.ThemeStore.reset();
  StoreActions.ApplicationStore.reset();
  StoreActions.ActiveDomainStore.reset();
  StoreActions.QueryParamStore.reset();
};

export interface StoreModel {
  ThemeStore: ThemeModel;
  QueryParamStore: QueryParamModel;
  ApplicationStore: ApplicationModel;
  SessionStore: SessionModel;
  ActiveDomainStore: ActiveDomainModel;
  onLogout: ThunkOn<SessionModel>;
}

const model: StoreModel = {
  ThemeStore,
  QueryParamStore,
  ApplicationStore,
  SessionStore: persist(SessionStore),
  ActiveDomainStore: persist(ActiveDomainStore),
  onLogout: thunkOn(onLogout, resetStores),
};

const store = createStore(model);

export default store;
