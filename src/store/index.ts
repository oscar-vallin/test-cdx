import { createStore } from 'easy-peasy';
import ThemeStore from './ThemeStore';

const model = {};
const store = createStore(model);

store.addModel('ThemeStore', ThemeStore);

export default store;
