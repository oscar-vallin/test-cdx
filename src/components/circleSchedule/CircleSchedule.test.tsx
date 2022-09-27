import { shallowWithTheme, mountWithTheme } from 'src/utils/testUtils';
import { CircleSchedule } from './CircleSchedule';

const defaultProps = {
    id: 'sun_0',
    label: 'Sun',
    selected: false,
    onClick: jest.fn(),
};

describe('Monthly and weekly circle test', () => {
  const tree = mountWithTheme(<CircleSchedule {...defaultProps} ></CircleSchedule>);

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

});