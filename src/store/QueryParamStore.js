import { action } from 'easy-peasy';

const INITIAL_PARAMS = {
  orgSid: null,
};

const setGlobalParam = (state, payload) => {
  state.data = { ...state.data, ...payload };
};

const QueryParamStore = {
  data: INITIAL_PARAMS,
  setGlobalParam: action(setGlobalParam),
};

export default QueryParamStore;
