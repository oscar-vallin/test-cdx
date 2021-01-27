import React from 'react';
import { render } from '@testing-library/react';
import { Row as Component } from './Row';

test('Render - Testing Message inside Row', () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
