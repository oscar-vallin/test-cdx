/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Customizer, loadTheme } from '@fluentui/react';

import 'office-ui-fabric-react/dist/css/fabric.css';

import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import Theming from 'src/utils/Theming';
import { useSessionStore } from 'src/store/SessionStore';
import { useThemeStore } from 'src/store/ThemeStore';
import { theme as styledComponentsTheme } from '../styles/themes/theme';
import { LoadingPage } from 'src/pages/Loading/LoadingPage';

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
  const [currentTheme, setTheme]: any = useState(styledComponentsTheme);
  const [styledTheme, setStyledTheme] = useState(styledComponentsTheme);
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
      overflow-y: hidden;
    }

    [class*="ms-DetailsHeader"] {
      font-size: .875rem;
    }

    [class*="ms-DetailsRow"] {
      font-size: .75rem;
    }
  `;

  type GlobalStyleProps = {
    fontSize: any;
  };

  const changeTheme = (theme = {}) => {
    const customizedTheme = {
      ...styledTheme,
      colors: { ...styledTheme.colors, ...theme },
    };

    setTheme(theme);
    setStyledTheme(customizedTheme);
  };

  useEffect(() => {
    if (!isLoadingTheme) {
      changeTheme(Theming.getVariant(ThemeStore.themes.current.dashThemeColor || {}));
    }
  }, [ThemeStore.themes.current]);

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
    <Customizer {...loadTheme({ palette: currentTheme || {} })}>
      <ThemeProvider theme={styledTheme}>
        <ThemeContext.Provider value={values}>
          {isLoadingTheme ? (
            <LoadingPage/>
          ) : (
            <>
              <GlobalStyle fontSize={ThemeStore.themes.current.themeFontSize} />
              {children}
            </>
          )}
        </ThemeContext.Provider>
      </ThemeProvider>
    </Customizer>
  );
};

//
export function useThemeContext() {
  return useContext(ThemeContext);
}
