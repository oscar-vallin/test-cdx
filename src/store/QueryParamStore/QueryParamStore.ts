import { Action, action } from 'easy-peasy';
import { QueryParams } from './QueryParamTypes';

export interface QueryParamModel {
  params: QueryParams;
  setGlobalParam: Action<QueryParamModel>;
  reset: Action<QueryParamModel>;
}

export const DEFAULT_QUERY_PARAMS = {
  orgSid: null,
};

const setGlobalParam = (state, payload) => {
  state.params = { ...state.params, ...payload };
};

const reset = (state) => {
  state.params = { ...DEFAULT_QUERY_PARAMS };
};

const INITIAL_QUERY_PARAM_STATE = {
  params: { ...DEFAULT_QUERY_PARAMS },
  setGlobalParam: action(setGlobalParam),
  reset: action(reset),
};

export default INITIAL_QUERY_PARAM_STATE;
