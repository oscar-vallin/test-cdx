import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { defaultTheme, darkTheme } from '../styles/themes';
import Theming from '../utils/Theming';

import {
  useUserThemeLazyQuery,
  useCreateOrUpdateOwnDashThemeMutation,
  useSetOwnDashThemeFontSizeMutation,
} from '../data/services/graphql';

// eslint-disable-next-line import/no-cycle
import { useAuthContext } from '../contexts/AuthContext';

export const useCurrentUserTheme = () => {
  const setUserTheme = useStoreActions(({ ThemeStore }) => ThemeStore.updateTheme);

  const { isAuthenticated } = useAuthContext();

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
      setUserTheme(theme.userTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
