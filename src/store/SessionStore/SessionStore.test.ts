import React from 'react';
import { createStore } from 'easy-peasy';

import SessionStore from './SessionStore';
import { SessionStages } from './SessionTypes';

describe('Unit::SessionStore', () => {
  const token = 'test';
  const store = createStore(SessionStore);

  it('Should store the authenticated user', async () => {
    store.getActions().setCurrentSession({ token });

    expect(store.getState().user.token).toEqual(token);
  });

  it('Should update the session stage', async () => {
    store.getActions().setSessionStage(SessionStages.LoggedIn);

    expect(store.getState().status.stage).toEqual(SessionStages.LoggedIn);
  });

  it('Should set stage to LOGGED_IN if a user token is present', async () => {
    store.getActions().setCurrentSession({ token });

    expect(store.getState().status.stage).toEqual(SessionStages.LoggedIn);
  });

  it('Should set isAuthenticated to true if a user token is present', async () => {
    store.getActions().setCurrentSession({ token });

    expect(store.getState().status.isAuthenticated).toEqual(true);
  });

  it('Should set stage to LOGGED_OUT if no user token is present', async () => {
    store.getActions().setCurrentSession({ token: null });

    expect(store.getState().status.stage).toEqual(SessionStages.LoggedOut);
  });

  it('Should set isAuthenticated to false if no token is present', async () => {
    store.getActions().setCurrentSession({ token: null });

    expect(store.getState().status.isAuthenticated).toEqual(false);
  });

  it('Should set isAutheticating to true if the session stage is VALIDATING', async () => {
    store.getActions().setSessionStage(SessionStages.Validating);

    expect(store.getState().status.isAuthenticating).toEqual(true);
  });

  it('Should set isAutheticating to false if the session stage is not VALIDATING', async () => {
    store.getActions().setSessionStage(SessionStages.LoggedOut);

    expect(store.getState().status.isAuthenticating).toEqual(false);
  });

  it('Should set isRehydrating to true if the session stage is REHYDRATING', async () => {
    store.getActions().setSessionStage(SessionStages.Rehydrating);

    expect(store.getState().status.isRehydrating).toEqual(true);
  });

  it('Should set isRehydrating to false if the session stage is not REHYDRATING', async () => {
    store.getActions().setSessionStage(SessionStages.LoggedOut);

    expect(store.getState().status.isRehydrating).toEqual(false);
  });
});
