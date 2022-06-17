import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from 'src/store/index';
import { DashThemeColor, ThemeFontSize } from 'src/data/services/graphql';
import { ThemeDefinition } from 'src/styles/themes/theme';
import { darkTheme, defaultTheme, ThemeColorsType } from 'src/styles/themes';

type ThemeStoreType = {
  userTheme: ThemeDefinition;
  changeThemeColors: (themeColors?: DashThemeColor | null) => void;
  setFontSize: (fontSize?: ThemeFontSize | null) => void;
  reset: () => void;
};

export const useThemeStore = (): ThemeStoreType => {
  const typedHooks = createTypedHooks<StoreModel>();

  const { userTheme } = typedHooks.useStoreState((state) => state.ThemeStore);
  const { setUserTheme, reset } = typedHooks.useStoreActions((state) => state.ThemeStore);

  const changeThemeColors = (themeColors?: DashThemeColor | null) => {
    // Hack: should use colors from theme
    let colors: ThemeColorsType;
    if (themeColors?.paletteNm?.includes('Dark')) {
      colors = darkTheme;
    } else {
      colors = defaultTheme;
    }
    setUserTheme({
      ...userTheme,
      colors,
    });
  };

  const setFontSize = (fontSize?: ThemeFontSize | null) => {
    setUserTheme({
      ...userTheme,
      themeFontSize: fontSize ?? ThemeFontSize.Medium,
    });
  };

  return {
    userTheme,
    changeThemeColors,
    setFontSize,
    reset,
  };
};
