import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'src/styles/themes';
import { theme } from '../styles/themes/theme';

// eslint-disable-next-line react/prop-types
const LightTheme = { ...theme, ...defaultTheme };
export const mountWithTheme = (children: any) => mount(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const renderWithTheme = (children: any) => render(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export * from '@testing-library/react';
