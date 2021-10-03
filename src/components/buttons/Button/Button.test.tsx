import { shallow } from 'enzyme';
import { Button } from './Button.js';

const baseProps = {
  text: 'Button Text',
  children: null,
  onClick: jest.fn(),
};

const defaultProps = {
  ...baseProps,
  id: '__Button',
  variant: 'secondary',
  disabled: false,
  block: false,
};

const theme = {
  colors: { themePrimary: '#fff', custom: { error: '#000  ' } },
};

describe('Button Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = shallow(<Button {...defaultProps} id={'__Button'} onClick={mockFn}></Button>);

  it('Should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a props', () => {
    expect(tree.props().id).toEqual('__Button');
    expect(tree.props().variant).toEqual('secondary');
    expect(tree.props().disabled).toBeFalsy();
  });

  it('Should have a children with only text when text is passed', () => {
    expect(tree.text()).toEqual('Button Text');
  });

  it('Should have a children when it is passed', () => {
    const defaultTree = shallow(<Button {...defaultProps} text={null} children={<p>Text Children</p>}></Button>);
    expect(defaultTree.children().text()).toEqual('Text Children');
  });

  it("Can't click when button is disabled", () => {
    const defaultTree = shallow(<Button {...defaultProps} theme={theme} disabled={true}></Button>);
    defaultTree.simulate('click');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Test styled Button component', () => {
    const wrapper = shallow(<Button {...defaultProps} theme={theme} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Default props values, Should have a props', () => {
    const baseTree = shallow(<Button {...baseProps} id={'__Button'}></Button>);
    expect(baseTree.props().id).toEqual('__Button');
    expect(baseTree.props().variant).toEqual('secondary');
    expect(baseTree.props().disabled).toBeFalsy();
    expect(baseTree.props().block).toBeFalsy();
  });

  it('Styled variants, coverate theme.', () => {
    const baseTree = shallow(
      <Button {...baseProps} id={'__Button'} block={true} theme={theme} variant="primary"></Button>
    ).dive();
    expect(baseTree).toMatchSnapshot();
  });
});
