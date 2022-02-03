import CDXTimeline from './Timeline';
import { mountWithTheme } from 'src/utils/testUtils';
import { WorkStepStatus } from 'src/data/services/graphql';

const items: WorkStepStatus[] = [
  {
    stepStatus: 'DONE',
    stepName: 'TEST_DONE',
    stepType: 'TEST_DONE'
  },
  {
    stepStatus: 'PROGRESS',
    stepName: 'TEST_PROGRESS',
    stepType: 'TEST_PROGRESS'
  }
]

const defaultProps = {
  items: items,
  activeIndex: 0,
};

describe('Timeline Testing Unit...', () => {
  const mockFn = jest.fn();
  const [STEP_DONE] = defaultProps.items;
  const tree = mountWithTheme(<CDXTimeline {...defaultProps} onClick={mockFn} />);

  it('Should be defined', () => {
    expect(CDXTimeline).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should match the step title', () => {
    const title = tree.find('.title').first().text();

    expect(title).toEqual(STEP_DONE.stepName);
  });

  it('Should match the step description', () => {
    const description = tree.find('.description').first().text();

    expect(description).toEqual(STEP_DONE.stepType);
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
