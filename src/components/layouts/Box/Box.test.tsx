import React from 'react';
import { render } from '@testing-library/react';
import { Box as Component } from './Box.js';

const defaultProps = { children: '', left: 'center', right: 'center', top: 'center', bottom: 'center' };

test('Render - Testing Message inside Row', () => {
  const { getByText } = render(<Component {...defaultProps}>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
