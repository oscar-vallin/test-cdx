import CDXTimeline from './Timeline';
import { mountWithTheme } from '../../../utils/testUtils';

const defaultProps = {
  items: [
    {
      status: 'DONE',
      content: {
        title: 'TEST_DONE',
        description: 'TEST_DONE',
      },
    },
    {
      status: 'PROGRESS',
      content: {
        title: 'TEST_PROGRESS',
        description: 'TEST_PROGRESS',
      },
    },
  ],
  activeIndex: 0,
};

describe('Timeline Testing Unit...', () => {
  const mockFn = jest.fn();
  const [STEP_DONE, STEP_PROGRESS] = defaultProps.items;
  const tree = mountWithTheme(<CDXTimeline {...defaultProps} onClick={mockFn} />);

  it('Should be defined', () => {
    expect(CDXTimeline).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should match the step title', () => {
    const title = tree.find('.title').first().text();

    expect(title).toEqual(STEP_DONE.content.title);
  });

  it('Should match the step description', () => {
    const description = tree.find('.description').first().text();

    expect(description).toEqual(STEP_DONE.content.description);
  });

  it('Should trigger the onClick callback', () => {
    tree.find('.item').first().simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('Should highlight the active step', () => {
    const isHighlighted = tree.find('.item__content').first().hasClass('item__content--active');

    expect(isHighlighted).toEqual(true);
  });
});
