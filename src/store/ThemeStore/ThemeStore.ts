import { Action, ActionOn, action, actionOn } from 'easy-peasy';
import { Theme, ColorModes, FontSizes } from './ThemeTypes';

export interface ThemeModel {
  themes: {
    user: Theme;
    current: Theme;
  };
  setUserTheme: Action<ThemeModel>;
  setCurrentTheme: Action<ThemeModel>;
  onUserThemeUpdate: ActionOn<ThemeModel>;
  reset: Action<ThemeModel>;
}

const INITIAL_THEME = {
  data: null,
  paletteNm: 'Default',
  themeColorMode: ColorModes.Light,
  themeFontSize: FontSizes.Medium,
};

const setUserTheme = (state, payload) => {
  state.themes.user = { ...state.themes.user, ...payload };
};

const setCurrentTheme = (state, action) => {
  const data = action?.payload || action;

  state.themes.current = { ...state.themes.current, ...data };
};

const reset = (state) => {
  state.themes.current = { ...INITIAL_THEME };
};

const INITIAL_THEME_STATE: ThemeModel = {
  themes: {
    user: { ...INITIAL_THEME },
    current: { ...INITIAL_THEME },
  },
  reset: action(reset),
  setUserTheme: action(setUserTheme),
  setCurrentTheme: action(setCurrentTheme),
  onUserThemeUpdate: actionOn((actions) => actions.setUserTheme, setCurrentTheme),
};

export default INITIAL_THEME_STATE;
