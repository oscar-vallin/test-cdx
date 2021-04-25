import React from 'react';

import { Customizer, loadTheme } from '@fluentui/react';
// import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import 'office-ui-fabric-react/dist/css/fabric.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '../styles/themes';
import { theme as styledComponentsTheme } from '../styles/themes/theme';

export const ThemeContext = React.createContext(() => {
});

export const ThemeContextProvider = ({ children }) => {
  const [isContextLoading, setLoading] = React.useState(true);
  const [currentTheme, setTheme] = React.useState(styledComponentsTheme);
  const [styledTheme, setStyledTheme] = React.useState(styledComponentsTheme);

  React.useEffect(() => {
    const theme = localStorage.getItem('CURRENT_THEME');

    if (theme) {
      const { name, themeColors } = JSON.parse(theme);
      changeTheme(name, themeColors);
    } else {
      changeTheme('LIGHT');
    }

    const localFunction = async () => {

      setLoading(false);
    };

    localFunction();

    return () => null;
  }, []);

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

    localStorage.setItem('CURRENT_THEME', JSON.stringify({ name, themeColors: customizedTheme.colors }));
  };

  // eslint-disable-next-line
  const values = React.useMemo(() => ({ isContextLoading, changeTheme }), [isContextLoading]);

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
  const context = React.useContext(ThemeContext);

  return context;
}
