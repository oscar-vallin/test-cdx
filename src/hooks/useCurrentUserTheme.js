/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
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

  const [apiUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  const fetchTheme = () => {
    if (isAuthenticated) {
      apiUserThemeQuery({ variables: { themeColorMode: null } });
    }
  };

  const [createOrUpdateOwnDashTheme, { data: updatedTheme, loading: isHandlingTheme }] =
    useCreateOrUpdateOwnDashThemeMutation();

  const [setOwnDashFontSize] = useSetOwnDashThemeFontSizeMutation();

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
        dashThemeColor: variant,
        themeColorMode,
        themeFontSize,
        // loading: isLoadingTheme,
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
