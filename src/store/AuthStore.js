import { action } from 'easy-peasy';

const INITIAL_AUTH_STATE = null;

const setAuthData = (state, payload) => {
  state.data = { ...state.data, ...payload };
};

const AuthStore = {
  data: INITIAL_AUTH_STATE,
  setAuthData: action(setAuthData),
};

export default AuthStore;
