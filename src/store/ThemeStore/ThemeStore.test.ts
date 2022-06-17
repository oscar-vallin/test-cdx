import { createStore } from 'easy-peasy';

import ThemeStore, { ThemeModel } from './ThemeStore';

describe('Unit::ThemeStore', () => {
  const store = createStore<ThemeModel>(ThemeStore);

  it('Still in implementation', async () => {
    expect(store).toBeDefined();
  });
});
