import { shallow } from 'enzyme';
import { ButtonIcon } from './ButtonIcon.js';
import { StyledFontIcon } from './ButtonIcon.styles';

const defaultProps = {
  size: '10',
};

const theme = {
  colors: { white: '#fff', size: 10 },
};

describe('ButtonIcon', () => {
  const mockFn = jest.fn();
  const tree = shallow(
    <ButtonIcon {...defaultProps} icon="edit" onClick={mockFn}>
      Button Contextual
    </ButtonIcon>
  );

  it('Should be defined', () => {
    expect(ButtonIcon).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have a click function', () => {
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should have a children with the icon prop', () => {
    expect(tree.children().props().iconName).toEqual('edit');
  });

  it('Test styled ButtonIcon component', () => {
    const testTree = shallow(
      <ButtonIcon {...defaultProps} theme={theme} size={10} icon="edit" onClick={mockFn}>
        Button Contextual
      </ButtonIcon>
    ).dive();
    expect(testTree).toMatchSnapshot();
  });

  it('Test styled StyledFontIcon component', () => {
    const testTree = shallow(<StyledFontIcon size={10} />).dive();
    expect(testTree).toMatchSnapshot();
  });
});
