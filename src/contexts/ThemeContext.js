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
    const localFunction = async () => {
      setLoading(false);
    };

    localFunction();

    return () => null;
  }, []);

  const changeTheme = (name, theme = {}) => {
    const themes = {
      light: defaultTheme,
      dark: darkTheme,
    }

    const themeColors = (name !== 'custom')
      ? themes[name]
      : { ...styledTheme, ...theme }; 

    setTheme(themeColors);
    setStyledTheme({
      ...styledTheme,
      colors: { ...styledTheme.colors, ...themeColors }
    });
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
