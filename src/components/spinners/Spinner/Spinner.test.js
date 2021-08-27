// import React from 'react';
// import { render } from '@testing-library/react';
// import { Spinner as Component } from './index';

// test('Render - Testing Message inside Image', () => {
//   const { getByText } = render(<Component />);
//   const linkElement = getByText(/Testing/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { shallow } from 'enzyme';
import { Spinner as Component } from './index';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { getSpinnerSize } from './Spinner.handlers';

describe('Spinner', () => {
  const tree = shallow(
    <Component size={StyleConstants.SPINNER_SMALL} label="loading ...">
      Text test
    </Component>
  );

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
