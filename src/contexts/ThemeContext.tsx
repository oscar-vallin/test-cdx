/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ThemeProvider as FluentThemeProvider, createTheme } from '@fluentui/react';

import 'office-ui-fabric-react/dist/css/fabric.css';

import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useSessionStore } from 'src/store/SessionStore';
import { useThemeStore } from 'src/store/ThemeStore';
import { LoadingPage } from 'src/pages/Loading/LoadingPage';
import { ThemeFontSize } from 'src/data/services/graphql';

const sizes = {
  SMALL: '.75rem',
  MEDIUM: '1rem',
  LARGE: '1.5rem',
};

export const ThemeContextProvider = ({ children }) => {
  const SessionStore = useSessionStore();
  const ThemeStore = useThemeStore();

  const { isLoadingTheme, fetchTheme } = useCurrentUserTheme();

  useEffect(() => {
    const { isAuthenticated } = SessionStore.status;

    if (isAuthenticated) {
      fetchTheme();
    }
  }, [SessionStore.user.token]);

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
        {isLoadingTheme ? (
          <LoadingPage />
        ) : (
          <>
            <GlobalStyle fontSize={ThemeStore.userTheme.themeFontSize ?? ThemeFontSize.Medium} />
            {children}
          </>
        )}
      </FluentThemeProvider>
    </ThemeProvider>
  );
};
