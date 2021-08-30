import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeContextProvider } from '../contexts/ThemeContext.js';

// eslint-disable-next-line react/prop-types
const AllTheProviders: FC = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
