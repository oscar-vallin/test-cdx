import { Computed } from 'easy-peasy';

export enum SessionStages {
  Validating = 'VALIDATING',
  LoggedIn = 'LOGGED_IN',
  LoggedOut = 'LOGGED_OUT',
  Rehydrating = 'REHYDRATING',
}

export type SessionUser = {
  token: string | null;
  id?: string | null;
  orgSid?: string | null;
  userId?: string | null;
  firstName?: string;
  defaultAuthorities?: Array<any>[];
};

export type SessionStatus = {
  isAuthenticated: Computed<SessionStatus, boolean>;
  isAuthenticating: Computed<SessionStatus, boolean>;
  isRehydrating: Computed<SessionStatus, boolean>;
  stage: SessionStages;
};
