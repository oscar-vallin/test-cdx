/* eslint-disable react-hooks/exhaustive-deps */
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as FluentThemeProvider } from '@fluentui/react';

import '@fluentui/react/dist/css/fabric.css';
import { useThemeStore } from 'src/store/ThemeStore';
import { ThemeFontSize } from 'src/data/services/graphql';
import { device } from 'src/styles/GlobalStyles';

const sizes = {
  SMALL: '.75rem',
  MEDIUM: '1rem',
  LARGE: '1.5rem',
};

export const ThemeContextProvider = ({ children }) => {
  const ThemeStore = useThemeStore();

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
    
    div.ms-DetailsHeader-cell.hide-for-mobile,
    div.ms-DetailsRow-cell.hide-for-mobile {
      display: none;
      
      @media ${device.tablet} {
        display: inline-block;
      }
    }
  `;

  type GlobalStyleProps = {
    fontSize: ThemeFontSize;
  };

  const createFluentTheme = () => {
    const theme = ThemeStore.userTheme;
    return createTheme({
      palette: theme.colors,
      fonts: {
        tiny: { fontSize: theme.fontSizes.xsmall },
        xSmall: { fontSize: theme.fontSizes.xsmall },
        small: { fontSize: theme.fontSizes.small },
        smallPlus: { fontSize: theme.fontSizes.small },
        medium: { fontSize: theme.fontSizes.normal },
        mediumPlus: { fontSize: theme.fontSizes.normal },
        large: { fontSize: theme.fontSizes.large },
        xLarge: { fontSize: theme.fontSizes.xlarge },
        xLargePlus: { fontSize: theme.fontSizes.xlarge },
        xxLarge: { fontSize: theme.fontSizes.huge },
        xxLargePlus: { fontSize: theme.fontSizes.giant },
      },
      isInverted: false,
    });
  };

  return (
    <ThemeProvider theme={ThemeStore.userTheme}>
      <FluentThemeProvider theme={createFluentTheme()}>
        <GlobalStyle fontSize={ThemeStore.userTheme.themeFontSize ?? ThemeFontSize.Medium} />
        {children}
      </FluentThemeProvider>
    </ThemeProvider>
  );
};
