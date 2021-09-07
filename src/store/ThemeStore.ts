import { action } from 'easy-peasy';
import { ActionPayload } from './StoreUtils';

const INITIAL_THEME = {
  data: null,
  loading: false,
  paletteNm: 'Default',
  themeColorMode: 'LIGHT',
  themeFontSize: 'MEDIUM',
};

const updateTheme = (state: any, payload: any): any => {
  state.theme = { ...state.theme, ...payload };

  return state;
};

const resetTheme = (state: any): any => {
  state.theme = { ...INITIAL_THEME };

  return state;
};

const ThemeStore = {
  theme: { ...INITIAL_THEME },
  updateTheme: action(updateTheme),
  resetTheme: action(resetTheme),
};

export default ThemeStore;
