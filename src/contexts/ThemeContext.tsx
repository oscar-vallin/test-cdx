/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import 'office-ui-fabric-react/dist/css/fabric.css';

import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useSessionStore } from 'src/store/SessionStore';
import { useThemeStore } from 'src/store/ThemeStore';
import { LoadingPage } from 'src/pages/Loading/LoadingPage';
import { ThemeFontSize } from 'src/data/services/graphql';

export const ThemeContext = createContext(() => {
  return {};
});

const sizes = {
  SMALL: '.75rem',
  MEDIUM: '1rem',
  LARGE: '1.5rem',
};

export const ThemeContextProvider = ({ children }) => {
  const SessionStore = useSessionStore();
  const ThemeStore = useThemeStore();

  const { isLoadingTheme, fetchTheme } = useCurrentUserTheme();
  const themeConfig = {};

  useEffect(() => {
    const { isAuthenticated } = SessionStore.status;

    if (isAuthenticated) {
      fetchTheme();
    }
  }, [SessionStore.status.isAuthenticated]);

  const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-size: ${({ fontSize }) => sizes[fontSize]};
    }

    body {
      overflow-x: auto;
    }

    [class*="ms-DetailsHeader"] {
      font-size: ${ThemeStore.userTheme.fontSizes.normal};
    }

    [class*="ms-DetailsRow"] {
      font-size: ${ThemeStore.userTheme.fontSizes.normal};
    }
  `;

  type GlobalStyleProps = {
    fontSize: ThemeFontSize;
  };

  const changeTheme = (newTheme = {}) => {

  };

  useEffect(() => {
    if (!isLoadingTheme) {
      changeTheme(ThemeStore.userTheme);
    }
  }, [ThemeStore.userTheme]);

  // eslint-disable-next-line
  const values: any = useMemo(
    () => ({
      // isContextLoading: isLoadingCurrentUserThemeParams,
      changeTheme,
      themeConfig,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeConfig]
  );

  return (
    <ThemeProvider theme={ThemeStore.userTheme}>
      <ThemeContext.Provider value={values}>
        {isLoadingTheme ? (
          <LoadingPage />
        ) : (
          <>
            <GlobalStyle fontSize={ThemeStore.userTheme.themeFontSize ?? ThemeFontSize.Medium} />
            {children}
          </>
        )}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};