import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { defaultTheme, darkTheme } from '../styles/themes';
import Theming from '../utils/Theming';

import {
  useUserThemeLazyQuery,
  useCreateOrUpdateOwnDashThemeMutation,
  useSetOwnDashThemeFontSizeMutation,
} from '../data/services/graphql';
import { useSessionStore } from '../store/SessionStore';
import { useThemeStore } from '../store/ThemeStore';

export const useCurrentUserTheme = () => {
  const SessionStore = useSessionStore();
  const ThemeStore = useThemeStore();

  const { isAuthenticated } = SessionStore.status;

  const [useUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  const fetchTheme = () => {
    if (isAuthenticated) {
      useUserThemeQuery({ variables: { themeColorMode: null } });
    }
  };

  const [createOrUpdateOwnDashTheme, { data: updatedTheme, loading: isHandlingTheme, error: themeError }] =
    useCreateOrUpdateOwnDashThemeMutation();

  const [setOwnDashFontSize, { data: updatedFontSize, loading: isHandlingFontSize, error: fontSizeError }] =
    useSetOwnDashThemeFontSizeMutation();

  useEffect(() => {
    if (theme?.userTheme) {
      ThemeStore.setUserTheme(theme.userTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (theme || updatedTheme) {
      const data = {
        ...(theme?.userTheme || {}),
        ...(updatedTheme?.createOrUpdateOwnDashTheme || {}),
      };

      const { dashThemeColor, themeColorMode, themeFontSize } = data;

      const palette = themeColorMode
        ? {
            ...(themeColorMode === 'LIGHT' ? defaultTheme : darkTheme),
            themePrimary: dashThemeColor?.themePrimary,
          }
        : dashThemeColor;

      const variant = Theming.getVariant(palette);

      ThemeStore.setUserTheme({
        paletteNm: dashThemeColor?.paletteNm,
        data: variant,
        themeColorMode,
        themeFontSize,
        loading: isLoadingTheme,
      });
    }
  }, [theme, updatedTheme]);

  return {
    createOrUpdateTheme: (dashThemeInput) => {
      createOrUpdateOwnDashTheme({ variables: { dashThemeInput } });
    },
    setOwnDashFontSize: (dashThemeInput) => {
      setOwnDashFontSize({ variables: { dashThemeInput } });
    },
    updatedTheme,
    isHandlingTheme,
    isLoadingTheme,
    // isHandlingFontSize,
    fetchTheme,
  };
};
