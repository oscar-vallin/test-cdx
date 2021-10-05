import { shallow } from 'enzyme';
import Component from './Spacing';

const defaultId = 'SpacingComponentTest';
const defaultChildren = 'Children Text';
const defaultMarginPadding = { top: 'double' };
const defaultBlock = 'inline';

const baseProps = {
  id: defaultId,
  block: defaultBlock,
  inline: true,
};

const defaultProps = {
  ...baseProps,
  margin: defaultMarginPadding,
  padding: defaultMarginPadding,
};

const theme = {
  colors: { themePrimary: '#fff', custom: { error: '#000  ' } },
};

describe('MessageBar Testing Unit...', () => {
  const tree = shallow(<Component {...defaultProps}>{defaultChildren}</Component>);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual(defaultId);
    expect(tree.props().margin).toEqual(defaultMarginPadding);
    expect(tree.props().padding).toEqual(defaultMarginPadding);
    expect(tree.props().block).toEqual(defaultBlock);
    expect(tree.props().inline).toBeTruthy();
  });

  it('Should have a children when it is passed', () => {
    expect(tree.children().first().text()).toEqual(defaultChildren);
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<Component {...baseProps}>{defaultChildren}</Component>);
    expect(baseTree.props().id).toEqual(defaultId);
    expect(baseTree.props().margin).toEqual({});
    expect(baseTree.props().padding).toEqual({});
    expect(baseTree.props().block).toEqual(defaultBlock);
    expect(baseTree.props().inline).toBeTruthy();
  });
});
