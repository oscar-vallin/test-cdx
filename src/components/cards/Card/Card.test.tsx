import { Card } from './Card.js';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  onClick: null,
};

describe('Card Testing Unit...', () => {
  const mockFn = jest.fn();
  const tree = mountWithTheme(<Card {...defaultProps}>Content</Card>);

  it('Should be defined', () => {
    expect(Card).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the content correctly', () => {
    expect(tree.find('.ms-DocumentCard').props().children).toEqual('Content');
  });

  it('Should trigger the onClick callback if provided', () => {
    const wrapper = mountWithTheme(<Card onClick={mockFn}>Content</Card>);
    
    wrapper.simulate('click');
    
    expect(mockFn).toHaveBeenCalled();
  });
});
