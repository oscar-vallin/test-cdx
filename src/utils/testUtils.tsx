import React, { FC, ReactElement } from 'react';
import { shallow, mount, render } from 'enzyme';
// import { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
// import { ThemeContextProvider } from '../contexts/ThemeContext.js';
import { defaultTheme } from '../styles/themes/index.js';
import { theme } from '../styles/themes/theme.js';

// eslint-disable-next-line react/prop-types
const LightTheme = { ...theme, ...defaultTheme };
export const mountWithTheme = (children: any) => mount(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

export const renderWithTheme = (children: any) => render(<ThemeProvider theme={LightTheme}>{children}</ThemeProvider>);

// const AllTheProviders: FC = ({ children }) => {
//   return <ThemeContextProvider>{children}</ThemeContextProvider>;
// };

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
// export { customRender as render };
