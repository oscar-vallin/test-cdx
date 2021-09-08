import { createStore } from 'easy-peasy';
import ThemeStore from './ThemeStore';
import ActiveOrgStore from './ActiveOrgStore';
import AuthStore from './AuthStore';

const model = {};
const store = createStore(model);

store.addModel('ThemeStore', ThemeStore);
store.addModel('ActiveOrgStore', ActiveOrgStore);
store.addModel('AuthStore', AuthStore);

export default store;
