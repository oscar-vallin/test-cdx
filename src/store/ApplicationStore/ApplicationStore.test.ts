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

  it ('Should update the version', async () => {
    expect(store.getState().version).toEqual('');
    store.getActions().updateVersion('2.0.1.TEST');

    expect(store.getState().version).toEqual('2.0.1.TEST');
  });

  // !TODO: Verify erorr on this test.
  // it('Should reset its state', async () => {
  //   store.getActions().reset();

  //   expect(store.getState()).toEqual(DEFAULT_APPLICATION_STATE);
  // });
});
