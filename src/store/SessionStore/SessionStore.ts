import { Action, ActionOn, action, actionOn, computed } from 'easy-peasy';
import { SessionUser, SessionStatus, SessionStages } from './SessionTypes';

export interface SessionModel {
  user: SessionUser;
  status: SessionStatus;
  setSessionStage: Action<SessionModel, string>;
  setCurrentSession: Action<SessionModel, SessionUser>;
  onCurrentSessionUpdate: ActionOn<SessionModel>;
}

const setSessionStage = (state, payload) => {
  state.status.stage = payload;
};

const setCurrentSession = (state, payload) => {
  state.user = payload;
};

export const INITIAL_SESSION_STATE: SessionModel = {
  user: {
    token: null,
  },
  status: {
    stage: SessionStages.Rehydrating,
    isAuthenticated: computed((state) => state.stage === SessionStages.LoggedIn),
    isAuthenticating: computed((state) => state.stage === SessionStages.Validating),
    isRehydrating: computed((state) => state.stage === SessionStages.Rehydrating),
  },
  setCurrentSession: action(setCurrentSession),
  setSessionStage: action(setSessionStage),
  onCurrentSessionUpdate: actionOn(
    (actions) => actions.setCurrentSession,
    (state, { payload }) => {
      state.status.stage = payload.token ? SessionStages.LoggedIn : SessionStages.LoggedOut;
    }
  ),
};

export default INITIAL_SESSION_STATE;