import { createStore } from 'easy-peasy';

import QueryParamStore, { DEFAULT_QUERY_PARAMS } from './QueryParamStore';

describe('Unit::QueryParamStore', () => {
  const store = createStore(QueryParamStore);
  const params = { orgSid: '1', enablePolling: true };

  it('Should match default query params when instantiated', async () => {
    expect(store.getState().params).toEqual(DEFAULT_QUERY_PARAMS);
  });

  it('Should update the global query params', async () => {
    store.getActions().setGlobalParam(params);

    expect(store.getState().params).toEqual(params);
  });

  it('Should reset its state', async () => {
    store.getActions().reset();

    expect(store.getState().params).toEqual(DEFAULT_QUERY_PARAMS);
  });
});
