import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { defaultTheme, darkTheme } from './../styles/themes';
import Theming from './../utils/Theming';

import {
  useUserThemeLazyQuery,
  useCreateOrUpdateOwnDashThemeMutation,
  useSetOwnDashThemeFontSizeMutation,
} from '../data/services/graphql';

import { useAuthContext } from '../contexts/AuthContext';

export const useCurrentUserTheme = () => {
  const setUserTheme = useStoreActions(({ ThemeStore }) => ThemeStore.updateTheme);

  const { isAuthenticated } = useAuthContext();

  const [useUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  const fetchTheme = () => {
    if (isAuthenticated) {
      useUserThemeQuery({ variables: { themeColorMode: null } });
    }
  };

  const [
    createOrUpdateOwnDashTheme,
    { data: updatedTheme, loading: isHandlingTheme, error: themeError },
  ] = useCreateOrUpdateOwnDashThemeMutation();

  const [
    setOwnDashFontSize,
    { data: updatedFontSize, loading: isHandlingFontSize, error: fontSizeError },
  ] = useSetOwnDashThemeFontSizeMutation();

  useEffect(() => {
    if (theme?.userTheme) {
      setUserTheme(theme.userTheme);
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

      setUserTheme({
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
