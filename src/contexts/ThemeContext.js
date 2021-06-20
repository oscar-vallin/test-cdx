import React, { useState, useEffect, useMemo, useContext } from 'react';

import { Customizer, loadTheme } from '@fluentui/react';
// import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import 'office-ui-fabric-react/dist/css/fabric.css';
import { ThemeProvider } from 'styled-components';
import { theme as styledComponentsTheme } from '../styles/themes/theme';

import { useCurrentUserTheme } from './../hooks/useCurrentUserTheme';
import { LayoutLogin } from './../layouts/LayoutLogin';
import { Spacing } from './../components/spacings/Spacing';
import { Spinner } from './../components/spinners/Spinner';
import { StyledCard } from './../containers/forms/FormLogin/FormLogin.styles';
import Theming from './../utils/Theming';

export const ThemeContext = React.createContext(() => {
});

export const ThemeContextProvider = ({ children }) => {
  const { userTheme, isLoadingTheme, fetchTheme } = useCurrentUserTheme();
  const [currentTheme, setTheme] = useState(styledComponentsTheme);
  const [styledTheme, setStyledTheme] = useState(styledComponentsTheme);

  const [themeConfig, setThemeConfig] = useState({});

  useEffect(fetchTheme, []);

  useEffect(() => {
    if (!isLoadingTheme) {
      changeTheme(Theming.getVariant(userTheme?.data || {}));
    }
  }, [userTheme]);

  const changeTheme = (theme = {}) => {
    const customizedTheme = {
      ...styledTheme, colors: { ...styledTheme.colors, ...theme }
    };

    setTheme(theme);
    setStyledTheme(customizedTheme);
  };

  // eslint-disable-next-line
  const values = useMemo(() => ({
    // isContextLoading: isLoadingCurrentUserThemeParams,
    changeTheme,
    themeConfig,
  }), [themeConfig]);

  return (
    <Customizer {...loadTheme({ palette: (currentTheme || {}) })}>
      <ThemeProvider theme={styledTheme}>
        <ThemeContext.Provider value={values}>
          {isLoadingTheme
            ? (
              <LayoutLogin>
                <StyledCard>
                  <Spacing margin={{ top: 'normal' }}>
                    <Spinner size="lg" label="Fetching your preferences"/>
                  </Spacing>
                </StyledCard>
              </LayoutLogin>
            )
            : children
          }
        </ThemeContext.Provider>
      </ThemeProvider>
    </Customizer>
  );
};

//
export function useThemeContext() {
  const context = useContext(ThemeContext);

  return context;
}
