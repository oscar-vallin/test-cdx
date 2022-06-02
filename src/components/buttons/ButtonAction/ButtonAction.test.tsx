import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';
import { ButtonAction } from './ButtonAction';

const defaultProps = {
  id: '',
  icon: '',
  disabled: false,
  onClick: () => null,
  iconProps: '',
};

describe('ButtonAction', () => {
  const mockFn = jest.fn();
  const tree = shallowWithTheme(
    <ButtonAction {...defaultProps} onClick={mockFn} icon="edit">
      Testing ButtonAction
    </ButtonAction>
  );

  it('Should be defined', () => {
    expect(ButtonAction).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.children().simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have an icon', () => {
    expect(tree.children().props().icon).toEqual('edit');
  });

  it('Should renders children', () => {
    expect(tree.children().contains('Testing ButtonAction')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallowWithTheme(
      <ButtonAction {...defaultProps}>
        <div className="children" />
      </ButtonAction>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });

  it('Test styled ButtonAction component', () => {
    const wrapper = shallowWithTheme(
      <ButtonAction {...defaultProps}>
        <div className="children" />
      </ButtonAction>
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Default props values, Should have a props', () => {
    const defaultTree = shallowWithTheme(
      <ButtonAction id={'__ButtonAction'} icon="up">
        Button Text
      </ButtonAction>
    );
    const mountTree = mountWithTheme(
      <ButtonAction id={'__ButtonAction'} icon="up">
        Button Text
      </ButtonAction>
    );
    expect(defaultTree).toMatchSnapshot();

    expect(defaultTree.children().props().id).toEqual('__ButtonAction');
    expect(defaultTree.children().props().icon).toEqual('up');
    expect(defaultTree.children().props().disabled).toEqual(false);
    expect(mountTree.children().props().id).toEqual('__ButtonAction');
    // expect(defaultTree.children().props().disabled).toBeTruthy();
    defaultTree.children().simulate('click');
    mountTree.children().simulate('click');
  });
});
