import { Action, action, ActionOn, actionOn, computed } from 'easy-peasy';
import { SessionStages, SessionStatus, SessionUser } from './SessionTypes';

export interface SessionModel {
  user: SessionUser;
  status: SessionStatus;
  logout: Action<SessionModel>;
  setSessionStage: Action<SessionModel, string>;
  setCurrentSession: Action<SessionModel, SessionUser>;
  setRedirectUrl: Action<SessionModel, string | null>;
  onCurrentSessionUpdate: ActionOn<SessionModel>;
  redirectUrl: string | null;
}

const setSessionStage = (state, payload) => {
  state.status.stage = payload;
};

const setCurrentSession = (state, payload) => {
  state.user = payload;
};

const setRedirectUrl = (state, payload) => {
  state.redirectUrl = payload;
};

const logout = (state) => {
  state.status.stage = SessionStages.LoggedOut;
  state.user = {
    token: null,
  };
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
  onCurrentSessionUpdate: actionOn(
    (actions) => actions.setCurrentSession,
    (state, { payload }) => {
      state.status.stage = payload.token ? SessionStages.LoggedIn : SessionStages.LoggedOut;
    }
  ),
  redirectUrl: null,
};

export default INITIAL_SESSION_STATE;
