import { shallow } from 'enzyme';
import CDXInfoIcon from './InfoIcon';

const defaultProps = { content: 'ImageId' };

describe('Image', () => {
  const tree = shallow(<CDXInfoIcon {...defaultProps} />);

  it('Should be defined', () => {
    expect(CDXInfoIcon).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(CDXInfoIcon).toMatchSnapshot();
  });
});
