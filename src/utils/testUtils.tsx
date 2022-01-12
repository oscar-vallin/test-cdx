import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/index';
import { theme } from '../styles/themes/theme';

// eslint-disable-next-line react/prop-types
const LightTheme = { ...theme, ...defaultTheme };
export const mountWithTheme = (children: any) => mount(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const renderWithTheme = (children: any) => render(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export * from '@testing-library/react';

export const randomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
