import { createStore } from 'easy-peasy';

import ThemeStore from './ThemeStore';

describe('Unit::ThemeStore', () => {
  const store = createStore(ThemeStore);

  it('Still in implementation', async () => {
    expect(store).toBeDefined();
  });
});
