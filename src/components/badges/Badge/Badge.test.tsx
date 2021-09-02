import React from 'react';
import { CDXBadge } from './Badge.js';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  pill: false,
  variant: 'info',
};

describe('Badge Testing Unit...', () => {
  const tree = mountWithTheme(<CDXBadge {...defaultProps}>Content</CDXBadge>);

  it('Should be defined', () => {
    expect(CDXBadge).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property if provided', () => {
    const wrapper = mountWithTheme(
      <CDXBadge label="Test" {...defaultProps}>
        Content
      </CDXBadge>
    );

    expect(wrapper.find('span').props().children).toEqual('Test');
  });

  it('Should render its children if no label is provided', () => {
    expect(tree.find('span').props().children).toEqual('Content');
  });
});
