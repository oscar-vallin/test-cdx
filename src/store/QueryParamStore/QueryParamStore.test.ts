import { createStore } from 'easy-peasy';

import QueryParamStore from './QueryParamStore';

describe('Unit::QueryParamStore', () => {
  const store = createStore(QueryParamStore);

  it('Still in implementation', async () => {
    expect(store).toBeDefined();
  });
});
