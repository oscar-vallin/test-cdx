import { shallow } from 'enzyme';
import { Button } from './Button.js';

const defaultProps = {
  text: 'text',
};

describe('Button Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = shallow(
    <Button {...defaultProps} onClick={mockFn}>
      Testing Button
    </Button>
  );

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
});
