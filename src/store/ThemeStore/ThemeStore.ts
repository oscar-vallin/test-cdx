import { Action, action, } from 'easy-peasy';
import { theme as DefaultTheme, ThemeDefinition } from 'src/styles/themes/theme';

export interface ThemeModel {
  userTheme: ThemeDefinition;
  setUserTheme: Action<ThemeModel, ThemeDefinition>;
  reset: Action<ThemeModel>;
}

const INITIAL_THEME: ThemeDefinition = {
  ...DefaultTheme
};

const setUserTheme = (state, payload) => {
  state.userTheme = { ...state.userTheme, ...payload };
};

const reset = (state) => {
  state.userTheme = { ...INITIAL_THEME };
};

const INITIAL_THEME_STATE: ThemeModel = {
  userTheme: {...INITIAL_THEME},
  reset: action(reset),
  setUserTheme: action(setUserTheme),
};

export default INITIAL_THEME_STATE;
