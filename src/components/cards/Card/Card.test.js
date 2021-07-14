import React from 'react';
import { render } from '@testing-library/react';
import { Card as Component } from './Card';

test('Render - Testing Message inside Card', () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Card/i);
  expect(linkElement).toBeInTheDocument();
});
