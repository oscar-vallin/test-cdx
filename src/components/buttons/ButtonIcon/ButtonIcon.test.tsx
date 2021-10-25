import { shallowWithTheme } from 'src/utils/testUtils';
import { ButtonIcon } from './ButtonIcon';
import { StyledFontIcon } from './ButtonIcon.styles';

const defaultProps = {
  size: 10,
};

describe('ButtonIcon', () => {
  const mockFn = jest.fn();
  const tree = shallowWithTheme(
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
    tree.children().simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Test styled ButtonIcon component', () => {
    const testTree = shallowWithTheme(
      <ButtonIcon {...defaultProps} size={10} icon="edit" onClick={mockFn}>
        Button Contextual
      </ButtonIcon>
    ).dive();
    expect(testTree).toMatchSnapshot();
  });

  it('Test styled StyledFontIcon component', () => {
    const testTree = shallowWithTheme(<StyledFontIcon size={10} />).dive();
    expect(testTree).toMatchSnapshot();
  });
});
