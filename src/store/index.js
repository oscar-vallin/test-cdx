import { createStore } from 'easy-peasy';
import ThemeStore from './ThemeStore';
import ActiveOrgStore from './ActiveOrgStore';
import AuthStore from './AuthStore';
import QueryParamStore from './QueryParamStore';

const model = {};
const store = createStore(model);

store.addModel('ThemeStore', ThemeStore);
store.addModel('ActiveOrgStore', ActiveOrgStore);
store.addModel('AuthStore', AuthStore);
store.addModel('QueryParamStore', QueryParamStore);

export default store;
