import { shallow } from 'enzyme';
import { StyleConstants } from 'src/data/constants/StyleConstants';
import Component from './Spinner';

const defaultId = 'SpinnerComponentTest';
const defaultSize = StyleConstants.SPINNER_XSMALL;
const defaultSizeValue = 0;
const defaultLabel = 'Label';

const baseProps = {
  id: defaultId,
};

const defaultProps = {
  ...baseProps,
  size: defaultSize,
  label: defaultLabel,
};

describe('MessageBar Testing Unit...', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual(defaultId);
    expect(tree.props().size).toEqual(defaultSizeValue);
    expect(tree.props().label).toEqual(defaultLabel);
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<Component {...baseProps} />);
    expect(baseTree.props().id).toEqual(defaultId);
    expect(baseTree.props().size).toEqual(1);
    expect(baseTree.props().label).toEqual('');
  });
});
