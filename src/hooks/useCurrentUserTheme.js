import { useState, useEffect } from 'react';

import { defaultTheme, darkTheme } from './../styles/themes';
import Theming from './../utils/Theming';

import { useUserThemeLazyQuery, useCreateOrUpdateOwnDashThemeMutation } from '../data/services/graphql';

const INITIAL_THEME = {
  data: null,
  loading: false,
  paletteNm: 'Default',
  themeColorMode: 'LIGHT',
  themeFontSize: 'MEDIUM',
};

export const useCurrentUserTheme = () => {
  const [userTheme, setUserTheme] = useState({ ...INITIAL_THEME });

  const [useUserThemeQuery, { data: theme, loading: isLoadingTheme }] = useUserThemeLazyQuery();

  const fetchTheme = () => {
    useUserThemeQuery({ variables: { themeColorMode: null } });
  };

  const [
    createOrUpdateOwnDashTheme,
    { data: updatedTheme, loading: isHandlingTheme, error: themeError },
  ] = useCreateOrUpdateOwnDashThemeMutation();

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
    updatedTheme,
    isHandlingTheme,
    isLoadingTheme,
    userTheme,
    fetchTheme,
  };
};
