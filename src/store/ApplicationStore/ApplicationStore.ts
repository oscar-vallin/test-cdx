import { Action, action } from 'easy-peasy';
import { ApplicationStatus } from './ApplicationTypes';

export interface ApplicationModel {
  status: ApplicationStatus;
  setIsOffline: Action<ApplicationModel>;
  reset: Action<ApplicationModel>;
}

export const DEFAULT_APPLICATION_STATE = {
  status: {
    isOffline: false,
  },
};

const setIsOffline = (state, payload) => {
  state.status.isOffline = payload;
};

const reset = (state) => {
  state.status = { ...DEFAULT_APPLICATION_STATE.status };
};

const INITIAL_APPLICATION_STATE = {
  ...DEFAULT_APPLICATION_STATE,
  setIsOffline: action(setIsOffline),
  reset: action(reset),
};

export default INITIAL_APPLICATION_STATE;
