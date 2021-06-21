import { useState, useEffect } from 'react';

import { defaultTheme, darkTheme } from './../styles/themes';
import Theming from './../utils/Theming';

import {
  useUserThemeLazyQuery,
  useCreateOrUpdateOwnDashThemeMutation
} from '../data/services/graphql';

export const useCurrentUserTheme = () => {
  const [userTheme, setUserTheme] = useState({
    data: null,
    loading: false,
    paletteNm: 'Default',
    themeColorMode: 'LIGHT',
    themeFontSize: 'MEDIUM'
  })

  const [
    useUserThemeQuery, { data: theme, loading: isLoadingTheme }
  ] = useUserThemeLazyQuery();

  const fetchTheme = () => {
    useUserThemeQuery({ variables: { themeColorMode: null } });
  }

  const [
    createOrUpdateOwnDashTheme,
    {
      data: updatedTheme,
      loading: isHandlingTheme,
      error: themeError
    }
  ] = useCreateOrUpdateOwnDashThemeMutation();

  useEffect(() => {
    if (theme || updatedTheme) {
      const data = {
        ...(theme?.userTheme || {}),
        ...(updatedTheme?.createOrUpdateOwnDashTheme || {})
      };
      const { dashThemeColor, themeColorMode, themeFontSize } = data;

      const palette = (dashThemeColor)
      ? dashThemeColor
      : (themeColorMode)
          ? (themeColorMode === 'LIGHT') ? defaultTheme : darkTheme
          : defaultTheme;

      const variant = Theming.getVariant(palette);

      setUserTheme({
        paletteNm: dashThemeColor?.paletteNm,
        data: variant,
        themeColorMode,
        themeFontSize,
        loading: isLoadingTheme
      });
    }
  }, [theme, updatedTheme]);

  return {
    createOrUpdateTheme: (dashThemeInput) => {
      createOrUpdateOwnDashTheme({ variables: { dashThemeInput } });
    },
    updatedTheme,
    isHandlingTheme,
    isLoadingTheme,
    userTheme,
    fetchTheme,
  }
}