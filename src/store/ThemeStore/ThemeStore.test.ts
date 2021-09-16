import { createStore } from 'easy-peasy';

import ThemeStore from './ThemeStore';

describe('Unit::ThemeStore', () => {
  const token = 'test';
  const store = createStore(ThemeStore);

  it('Still in implementation', async () => {
    expect(store).toBeDefined();
  });
});
