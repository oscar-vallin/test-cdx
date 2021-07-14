import React from 'react';
import { render } from '@testing-library/react';
import { Box as Component } from './Box';

test('Render - Testing Message inside Row', () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
