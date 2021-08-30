import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Image as Component } from './index';

// test('Render - Testing Message inside Image', () => {
//   const { getByText } = render(
//     <Component name="logo" alt="Testing">
//       Testing
//     </Component>
//   );
//   const linkElement = getByText(/Testing/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Image', () => {
  const tree = shallow(<Component src="http://image.com/test.png" />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should have a src image prop', () => {
    const imgSrc = tree.props().src;
    expect(imgSrc).toBe('http://image.com/test.png');
  });
});
