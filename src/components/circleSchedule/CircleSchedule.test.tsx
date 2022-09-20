import { shallow } from 'enzyme';
import { shallowWithTheme } from 'src/utils/testUtils';
import { CircleSchedule } from './CircleSchedule';

const defaultProps = {
    label: 'Sun',
    selected: false,
    onClick: jest.fn(),
    key: 0,
};

describe('Monthly and weekly circle test', () => {
  const tree = shallowWithTheme(<CircleSchedule {...defaultProps} ></CircleSchedule>);

  it('Should be defined', () => {
    expect(CircleSchedule).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should change the color', () => {
    const mockFn = jest.fn();
    const tree2 = shallowWithTheme(<CircleSchedule {...defaultProps} selected={true} onClick={mockFn}></CircleSchedule>);
    tree2.simulate('click');
    expect(tree2.children().props().selected).toEqual(true);
  })

})