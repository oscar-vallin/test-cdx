import React from 'react';
import CDXCollapse from './Collapse.js';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  label: 'Test',
};

describe('Collapse Testing Unit...', () => {
  const mockFn = jest.fn();

  const tree = mountWithTheme(
    <CDXCollapse {...defaultProps} onToggle={mockFn}>
      Content
    </CDXCollapse>
  );

  it('Should be defined', () => {
    expect(CDXCollapse).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the label property', () => {
    const text = tree.find('.collapse__trigger').text().trim();

    expect(text).toEqual(defaultProps.label);
  });

  it('Should trigger the onToggle callback', () => {
    tree.find('.collapse__trigger').simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
