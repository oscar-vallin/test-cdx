/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { ThemeFontSize, useSetOwnDashThemeFontSizeMutation, useUserThemeLazyQuery } from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useSessionStore } from '../store/SessionStore';
import { useThemeStore } from '../store/ThemeStore';

export const useCurrentUserTheme = () => {
  const SessionStore = useSessionStore();
  const ThemeStore = useThemeStore();
  const handleError = ErrorHandler();

  const { isAuthenticated } = SessionStore.status;

  const [callUserThemeQuery, { data: dataTheme, loading: loadingTheme }] = useUserThemeLazyQuery();
  const [callSetOwnDashFontSize, { data: dataUpdatedFont, loading: loadingFont, error: errorFont }] = useSetOwnDashThemeFontSizeMutation();

  useEffect(() => {
    handleError(errorFont);
  }, [errorFont, handleError]);

  const fetchTheme = () => {
    if (isAuthenticated) {
      callUserThemeQuery({ variables: { themeColorMode: null } });
    }
  };

  useEffect(() => {
    if (loadingTheme) {
      return;
    }
    ThemeStore.changeThemeColors(dataTheme?.userTheme?.dashThemeColor);
  }, [dataTheme, loadingTheme]);

  useEffect(() => {
    if (loadingFont) {
      return;
    }
    ThemeStore.setFontSize(dataUpdatedFont?.setOwnDashThemeFontSize?.themeFontSize);
  }, [dataUpdatedFont, loadingFont]);

  const setFontSize = (fontSize: ThemeFontSize) => {
    callSetOwnDashFontSize({
      variables: {
        dashThemeInput: {
          themeFontSize: fontSize,
        },
      },
    }).then();
  };

  return {
    setFontSize,
    isLoadingTheme: loadingTheme,
    fetchTheme,
  };
};
