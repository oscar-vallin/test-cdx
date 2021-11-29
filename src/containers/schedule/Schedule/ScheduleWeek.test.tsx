import { shallow } from 'enzyme';
import { ScheduleWeek as Component } from './ScheduleWeek';
import { mountWithTheme } from '../../../utils/testUtils';

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
    expect(tree).toMatchSnapshot();
  });

  it('Should sink in the div CalendarBody', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('#CalendarBodyCell-1').first();
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
