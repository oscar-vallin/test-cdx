import { useState, useEffect } from 'react';

import { defaultTheme, darkTheme } from './../styles/themes';
import Theming from './../utils/Theming';

import {
  useUserThemeLazyQuery
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

  useEffect(() => {
    if (theme) {
      const { dashThemeColor, themeColorMode, themeFontSize } = theme.userTheme || {};

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
  }, [theme]);

  return {
    isLoadingTheme,
    userTheme,
    fetchTheme,
  }
}