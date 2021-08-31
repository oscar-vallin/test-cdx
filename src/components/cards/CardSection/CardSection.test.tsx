import React from 'react';
import { render } from '@testing-library/react';
import { CardSection as Component } from './CardSection.js';

test('Render - Testing Message inside CardSection', () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
