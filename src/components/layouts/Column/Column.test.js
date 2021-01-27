import React from 'react';
import { render } from '@testing-library/react';
import { Column as Component } from './Column';

test('Render - Testing Message inside Column', () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
