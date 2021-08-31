import React from 'react';
import { render } from '@testing-library/react';
import { Column as Component } from './Column.js';

const defaultProps = {
  children: '',
  center: 'center',
  right: 'center',
  top: 'center',
  bottom: 'center',
  centerV: 'center',
};

test('Render - Testing Message inside Column', () => {
  const { getByText } = render(<Component {...defaultProps}>Testing</Component>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
