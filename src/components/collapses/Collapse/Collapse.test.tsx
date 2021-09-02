import React from 'react';
import CDXCollapse from './Collapse.js';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  label: 'Test',
};

describe('Collapse Testing Unit...', () => {
  const tree = mountWithTheme(<CDXCollapse {...defaultProps}>Content</CDXCollapse>);

  it('Should be defined', () => {
    expect(CDXCollapse).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  // it('Should render the text property', () => {
  //   expect(tree.props().text).toEqual(defaultProps.text);
  // });

  // it('Should match the type property', () => {
  //   expect(tree.props().type).toEqual(MessageBarType.info);
  // });

  // it('Should be hidden by default', () => {
  //   expect(tree.props().visible).toEqual(false);
  // });
});
