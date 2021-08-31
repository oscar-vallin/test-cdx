import React from 'react';
import { render } from '@testing-library/react';
import { Row as Component } from './Row.js';

const defaultProps = {
  children: '',
  center: 'center',
  right: 'center',
  top: 'center',
  bottom: 'center',
  between: 'center',
  evenly: 'center',
  around: 'center',
};

test('Render - Testing Message inside Row', () => {
  const { getByText } = render(<Component {...defaultProps}>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
