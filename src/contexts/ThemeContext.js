import React, { useState, useEffect, useMemo, useContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Customizer, loadTheme } from '@fluentui/react';
import { useStoreState } from 'easy-peasy';

import 'office-ui-fabric-react/dist/css/fabric.css';
import { theme as styledComponentsTheme } from '../styles/themes/theme';

import { useCurrentUserTheme } from '../hooks/useCurrentUserTheme';
import { LayoutLogin } from '../layouts/LayoutLogin';
import { Spacing } from '../components/spacings/Spacing';
import { Spinner } from '../components/spinners/Spinner';
import { StyledCard } from '../containers/forms/FormLogin/FormLogin.styles';
import Theming from '../utils/Theming';
import { useSessionStore } from '../store/SessionStore';
import { useThemeStore } from '../store/ThemeStore';

export const ThemeContext = React.createContext(() => {
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
  const [currentTheme, setTheme] = useState(styledComponentsTheme);
  const [styledTheme, setStyledTheme] = useState(styledComponentsTheme);
  const themeConfig = {};

  useEffect(() => {
    const { isAuthenticated } = SessionStore.status;

    if (isAuthenticated) {
      fetchTheme();
    }
  }, [SessionStore.status.isAuthenticated]);

  const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-size: ${({ fontSize }) => sizes[fontSize]}
    }

    [class*="ms-DetailsHeader"] {
      font-size: .875rem;
    }

    [class*="ms-DetailsRow"] {
      font-size: .75rem;
    }
  `;

  useEffect(() => {
    if (!isLoadingTheme) {
      changeTheme(Theming.getVariant(ThemeStore.themes.current.dashThemeColor || {}));
    }
  }, [ThemeStore.themes.current]);

  const changeTheme = (theme = {}) => {
    const customizedTheme = {
      ...styledTheme,
      colors: { ...styledTheme.colors, ...theme },
    };

    setTheme(theme);
    setStyledTheme(customizedTheme);
  };

  // eslint-disable-next-line
  const values = useMemo(
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
          <GlobalStyle fontSize={ThemeStore.themes.current.themeFontSize} />

          {isLoadingTheme ? (
            <LayoutLogin id="ThemeContext">
              <StyledCard>
                <Spacing margin={{ top: 'normal' }}>
                  <Spinner size="lg" label="Fetching your preferences" />
                </Spacing>
              </StyledCard>
            </LayoutLogin>
          ) : (
            children
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
