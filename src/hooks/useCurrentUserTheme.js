import { useState, useEffect } from 'react';

import { defaultTheme, darkTheme } from './../styles/themes';
import Theming from './../utils/Theming';

import {
  useUserThemeLazyQuery,
  useCreateOrUpdateOwnDashThemeMutation,
  // useSetOwnDashThemeFontSizeMutation,
} from '../data/services/graphql';

import { useAuthContext } from '../contexts/AuthContext';

const INITIAL_THEME = {
  data: null,
  loading: false,
  paletteNm: 'Default',
  themeColorMode: 'LIGHT',
  themeFontSize: 'MEDIUM',
};

export const useCurrentUserTheme = () => {
  const [userTheme, setUserTheme] = useState({ ...INITIAL_THEME });
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

  // const [
  //   setOwnDashFontSize,
  //   { data: updatedFontSize, loading: isHandlingFontSize, error: fontSizeError },
  // ] = useSetOwnDashThemeFontSizeMutation();

  useEffect(() => {
    setUserTheme(theme?.userTheme || {});
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

  useEffect(() => {
    fetchTheme();
  }, []);

  return {
    createOrUpdateTheme: (dashThemeInput) => {
      createOrUpdateOwnDashTheme({ variables: { dashThemeInput } });
    },
    // setOwnDashFontSize: (dashThemeInput) => {
    //   setOwnDashFontSize({ variables: { dashThemeInput } });
    // },
    updatedTheme,
    isHandlingTheme,
    isLoadingTheme,
    // isHandlingFontSize,
    userTheme,
    fetchTheme,
  };
};
