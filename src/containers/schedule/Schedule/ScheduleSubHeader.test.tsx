import { mount } from 'enzyme';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { ScheduleSubHeader as Component } from './ScheduleSubHeader';

const defaultProps = {
  id: '',
  currentView: 'month',
  currentDate: new Date(),
  selectedDate: new Date(),
};

describe('Schedule Subheader Test...', () => {
  const themedComponent = shallowWithTheme(<Component {...defaultProps} />);
  const themedMount = mountWithTheme(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
  });

  it('Header Views, Should be defined', () => {
    const DayContainer = mountWithTheme(<Component {...defaultProps} currentView="day" />);
    const WeekContainer = mountWithTheme(<Component {...defaultProps} currentView="week" />);

    expect(DayContainer).toMatchSnapshot();
    expect(WeekContainer).toMatchSnapshot();
    expect(themedMount).toMatchSnapshot();

    expect(DayContainer).toBeDefined();
    expect(WeekContainer).toBeDefined();
    expect(themedMount).toBeDefined();
  });
});
