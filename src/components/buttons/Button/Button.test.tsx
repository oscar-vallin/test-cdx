import { shallow } from 'enzyme';
import { shallowWithTheme } from '../../../../src/utils/testUtils';
import { Button } from './Button';

const defaultProps = {
  text: 'Button Text',
  onClick: jest.fn(),
  id: '__Button',
  variant: 'secondary',
  disabled: false,
  block: false,
};

describe('Button Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = shallowWithTheme(<Button {...defaultProps} id={'__Button'} onClick={mockFn}></Button>);

  it('Should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.children().simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a props', () => {
    expect(tree.children().props().id).toEqual('__Button');
    expect(tree.children().props().variant).toEqual('secondary');
    expect(tree.children().props().disabled).toBeFalsy();
  });

  it('Should have a children with only text when text is passed', () => {
    const tree2 = shallow(<Button {...defaultProps} block={true}></Button>);
    expect(tree2.children().text()).toEqual('Button Text');
  });

  it('Should have a children when it is passed', () => {
    const defaultTree = shallowWithTheme(<Button {...defaultProps} children={<p>Text Children</p>}></Button>);
    expect(defaultTree.children().children().text()).toEqual('Text Children');
  });

  it("Can't click when button is disabled", () => {
    const defaultTree = shallowWithTheme(<Button {...defaultProps} disabled={true}></Button>);
    defaultTree.simulate('click');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Test styled Button component', () => {
    const wrapper = shallowWithTheme(<Button {...defaultProps} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Default props values, Should have a props', () => {
    const defaultTree = shallowWithTheme(<Button id={'__Button'}>Button Text</Button>);
    expect(defaultTree).toMatchSnapshot();

    expect(defaultTree.children().props().id).toEqual('__Button');
    expect(defaultTree.children().props().variant).toEqual('secondary');
    expect(defaultTree.children().props().disabled).toBeFalsy();
    expect(defaultTree.children().props().block).toBeFalsy();
    expect(defaultTree.children().children().text()).toEqual('Button Text');
    defaultTree.children().simulate('click');
  });

  it('Styled variants, coverate theme.', () => {
    const baseTree = shallowWithTheme(
      <Button {...defaultProps} id={'__Button'} block={true} variant="primary"></Button>
    ).dive();
    expect(baseTree).toMatchSnapshot();
  });
});
