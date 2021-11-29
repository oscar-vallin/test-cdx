import { shallow } from 'enzyme';
import { ScheduleMonth as Component } from './ScheduleMonth';
import { mountWithTheme } from '../../../../src/utils/testUtils';

const defaultProps = {
  id: 'CalendarBodyCell-1',
  currentDate: new Date(),
  selectedDate: new Date(),
  onChangeDate: () => null,
  items: [],
  onChangeView: () => null,
};

describe('ScheduleMonth', () => {
  const tree = shallow(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should sink in the div CalendarBody', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('#CalendarBodyCell-1').first();
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
