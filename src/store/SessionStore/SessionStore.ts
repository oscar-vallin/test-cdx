import { Action, action, computed } from 'easy-peasy';
import { SessionStages, SessionStatus, SessionUser } from './SessionTypes';

export interface SessionModel {
  user: SessionUser;
  status: SessionStatus;
  globalError?: string | null;
  logout: Action<SessionModel>;
  setSessionStage: Action<SessionModel, string>;
  setCurrentSession: Action<SessionModel, SessionUser>;
  setRedirectUrl: Action<SessionModel, string | null>;
  setGlobalError: Action<SessionModel, string | null>;
  redirectUrl: string | null;
}

const logout = (state) => {
  state.status.stage = SessionStages.LoggedOut;
  state.user = {
    token: null,
  };
};

const setSessionStage = (state, payload) => {
  state.status.stage = payload;
};

const setCurrentSession = (state, payload) => {
  state.user = payload;
  state.status.stage = payload.token ? SessionStages.LoggedIn : SessionStages.LoggedOut;
};

const setRedirectUrl = (state, payload) => {
  state.redirectUrl = payload;
};

const setGlobalError = (state, payload) => {
  state.globalError = payload;
};

export const INITIAL_SESSION_STATE: SessionModel = {
  user: {
    token: null,
  },
  status: {
    stage: SessionStages.LoggedOut,
    isAuthenticated: computed((state) => state.stage === SessionStages.LoggedIn),
    isAuthenticating: computed((state) => state.stage === SessionStages.Validating),
  },
  logout: action(logout),
  setCurrentSession: action(setCurrentSession),
  setSessionStage: action(setSessionStage),
  setRedirectUrl: action(setRedirectUrl),
  setGlobalError: action(setGlobalError),
  redirectUrl: null,
};

export default INITIAL_SESSION_STATE;
