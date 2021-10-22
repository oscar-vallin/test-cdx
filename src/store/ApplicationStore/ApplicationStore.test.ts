import { createStore } from 'easy-peasy';

import ApplicationStore, { DEFAULT_APPLICATION_STATE } from './ApplicationStore';

describe('Unit::ApplicationStore', () => {
  const store = createStore(ApplicationStore);

  it('Should match default state when instantiated', async () => {
    expect(store.getState()).toEqual(DEFAULT_APPLICATION_STATE);
  });

  it('Should update the isOffline flag', async () => {
    store.getActions().setIsOffline(true);

    expect(store.getState().status.isOffline).toEqual(true);
  });

  it('Should reset its state', async () => {
    store.getActions().reset();

    expect(store.getState()).toEqual(DEFAULT_APPLICATION_STATE);
  });
});
