import { Action, action } from 'easy-peasy';
import { ApplicationStatus } from './ApplicationTypes';

export interface ApplicationModel {
  status: ApplicationStatus;
  version: string;
  setIsOffline: Action<ApplicationModel, boolean>;
  updateVersion: Action<ApplicationModel, string>;
  reset: Action<ApplicationModel>;
}

export const DEFAULT_APPLICATION_STATE = {
  status: {
    isOffline: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  },
  version: '',
};

const setIsOffline = (state, payload) => {
  state.status.isOffline = payload;
};

const updateVersion = (state, payload) => {
  state.version = payload;
};

const reset = (state) => {
  state.status = { ...DEFAULT_APPLICATION_STATE.status };
};

const INITIAL_APPLICATION_STATE: ApplicationModel = {
  ...DEFAULT_APPLICATION_STATE,
  setIsOffline: action(setIsOffline),
  updateVersion: action(updateVersion),
  reset: action(reset),
};

export default INITIAL_APPLICATION_STATE;
