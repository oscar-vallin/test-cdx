import { shallow } from 'enzyme';
import { Image as Component } from './index';

const defaultProps = { id: 'ImageId', name: 'Image', src: '', alt: 'Alt Img' };

describe('Image', () => {
  const tree = shallow(<Component {...defaultProps} src="http://image.com/test.png" />);

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
