import { action } from 'easy-peasy';

const INITIAL_THEME = {
  data: null,
  loading: false,
  paletteNm: 'Default',
  themeColorMode: 'LIGHT',
  themeFontSize: 'MEDIUM',
};

const updateTheme = (state: any, payload: any): any => {
  state.theme = { ...state.theme, ...payload };
};

const resetTheme = (state: any): any => {
  state.theme = { ...INITIAL_THEME };
};

const ThemeStore = {
  theme: { ...INITIAL_THEME },
  updateTheme: action(updateTheme),
  resetTheme: action(resetTheme),
};

export default ThemeStore;
