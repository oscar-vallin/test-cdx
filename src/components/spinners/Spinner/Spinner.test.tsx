import React from 'react';
import { shallow } from 'enzyme';
import { Spinner as Component } from './index.js';
import { StyleConstants } from '../../../data/constants/StyleConstants.js';
import { getSpinnerSize } from './Spinner.handlers.js';

describe('Spinner', () => {
  const tree = shallow(<Component size={StyleConstants.SPINNER_SMALL} label="loading ..." />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a size', () => {
    expect(tree.props().size).toEqual(getSpinnerSize(StyleConstants.SPINNER_SMALL));
  });

  it('Should have a label', () => {
    expect(tree.props().label).toEqual('loading ...');
  });
});
