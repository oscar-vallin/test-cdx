import { action } from 'easy-peasy';

const INITIAL_AUTH_STATE = null;

const setAuthData = (state: any, payload: any): any => {
  state.data = { ...state.data, ...payload };
};

const AuthStore = {
  data: INITIAL_AUTH_STATE,
  setAuthData: action(setAuthData),
};

export default AuthStore;
