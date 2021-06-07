import React, { useState, useEffect, useMemo, useContext } from 'react';

import { Customizer, loadTheme } from '@fluentui/react';
// import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import 'office-ui-fabric-react/dist/css/fabric.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '../styles/themes';
import { theme as styledComponentsTheme } from '../styles/themes/theme';
import { useCurrentUserDashThemePageLazyQuery } from '../data/services/graphql';

export const ThemeContext = React.createContext(() => {
});

export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setTheme] = useState(styledComponentsTheme);
  const [styledTheme, setStyledTheme] = useState(styledComponentsTheme);

  const [themeConfig, setThemeConfig] = useState({});

  const [
    useDashThemeQuery,
    {
      data: currentUserThemeParams,
      loading: isLoadingCurrentUserThemeParams,
    }
  ] = useCurrentUserDashThemePageLazyQuery({ variables: {}});

  useEffect(useDashThemeQuery, []);

  useEffect(() => {
    if (!isLoadingCurrentUserThemeParams) {
      if (currentUserThemeParams) {
        const {
          themeColorModes,
          themeColorPalettes,
          themeFontSizes,
          dashTheme
        } = currentUserThemeParams.currentUserDashThemePage;

        setThemeConfig({
          themeColorModes,
          themeColorPalettes,
          themeFontSizes,
          dashTheme
        });

        changeTheme(!dashTheme ? 'LIGHT' : dashTheme);
      } else {
        changeTheme('LIGHT');
      }
    }
  }, [isLoadingCurrentUserThemeParams]);

  const getThemeColors = (name) => {
    const themes = {
      LIGHT: defaultTheme,
      DARK: darkTheme,
    }

    return (name !== 'CUSTOM')
      ? themes[name]
      : themes.LIGHT; 
  }

  const changeTheme = (name, theme = {}) => {
    const themeColors = { ...getThemeColors(name), ...theme };
    const customizedTheme = {
      ...styledTheme,
      colors: { ...styledTheme.colors, ...themeColors }
    };

    setTheme(themeColors);
    setStyledTheme(customizedTheme);

    // localStorage.setItem('CURRENT_THEME', JSON.stringify({ name, themeColors: customizedTheme.colors }));
  };

  // eslint-disable-next-line
  const values = useMemo(() => ({
    isContextLoading: isLoadingCurrentUserThemeParams,
    changeTheme,
    themeConfig,
  }), [isLoadingCurrentUserThemeParams, themeConfig]);

  return (
    <Customizer {...loadTheme({ palette: currentTheme })}>
      <ThemeProvider theme={styledTheme}>
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
      </ThemeProvider>
    </Customizer>
  );
};

//
export function useThemeContext() {
  const context = useContext(ThemeContext);

  return context;
}
