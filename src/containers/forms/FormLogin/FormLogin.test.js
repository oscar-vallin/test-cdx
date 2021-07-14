import React from 'react';
import { render } from '@testing-library/react';
import { FormLogin as Component } from './index';

test('Render - Testing Message inside FormLogin', () => {
  const { getByText } = render(<Component />);
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
