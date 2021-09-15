import { Action, ThunkOn, action, thunkOn } from 'easy-peasy';
import { Theme, ColorModes, FontSizes } from './ThemeTypes';

export interface ThemeModel {
  themes: {
    user: Theme;
    current: Theme;
  };
  setUserTheme: Action<ThemeModel>;
  setCurrentTheme: Action<ThemeModel>;
  onUserThemeUpdate: ThunkOn<ThemeModel>;
  reset: Action<ThemeModel>;
}

const INITIAL_THEME = {
  dashThemeColor: null,
  paletteNm: 'Default',
  themeColorMode: ColorModes.Light,
  themeFontSize: FontSizes.Medium,
};

const setUserTheme = (state, payload) => {
  state.themes.user = { ...state.themes.user, ...payload };
};

const setCurrentTheme = (state, payload) => {
  state.themes.current = { ...state.themes.current, ...payload };
};

const reset = (state) => {
  state.themes.user = { ...INITIAL_THEME };
};

const onUserThemeUpdate = async (actions, target) => {
  await actions.setCurrentTheme(target.payload || INITIAL_THEME);
};

const INITIAL_THEME_STATE: ThemeModel = {
  themes: {
    user: { ...INITIAL_THEME },
    current: { ...INITIAL_THEME },
  },
  reset: action(reset),
  setUserTheme: action(setUserTheme),
  setCurrentTheme: action(setCurrentTheme),
  onUserThemeUpdate: thunkOn((actions) => [actions.setUserTheme, actions.reset], onUserThemeUpdate),
};

export default INITIAL_THEME_STATE;
