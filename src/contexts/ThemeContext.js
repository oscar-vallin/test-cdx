import React from 'react';

import { Customizer, loadTheme } from '@fluentui/react';
// import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import 'office-ui-fabric-react/dist/css/fabric.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '../styles/themes';
import { theme as styledComponentsTheme } from '../styles/themes/theme';
//
export const ThemeContext = React.createContext(() => {
  // Initialization
});

export const ThemeContextProvider = ({ children }) => {
  // LocalState
  const [isContextLoading, setLoading] = React.useState(true);
  const [themeName, setThemeName] = React.useState('light');
  const [currentTheme, setTheme] = React.useState(defaultTheme);
  const [styledTheme, setStyledTheme] = React.useState(styledComponentsTheme);

  // Component Did Mount
  React.useEffect(() => {
    const localFunction = async () => {
      setLoading(false);
    };

    localFunction();

    return () => null;
  }, []);

  // useEffects Variables.

  // Local Functions shared in Context.
  const changeTheme = async () => {
    if (themeName === 'light') {
      setThemeName('dark');
      setTheme(darkTheme);
      setStyledTheme({ ...styledTheme, color: darkTheme });
    } else {
      setThemeName('light');
      setTheme(defaultTheme);
      setStyledTheme(styledTheme);
    }
  };

  // eslint-disable-next-line
  const values = React.useMemo(() => ({ isContextLoading, changeTheme }), [isContextLoading]);

  // Finally, return the interface that we want to expose to our other components
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
