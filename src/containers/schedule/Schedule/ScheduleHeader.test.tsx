import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';
import { ScheduleHeader as Component } from './ScheduleHeader';

const defaultProps = {
  id: '',
  currentView: 'month',
  currentDate: new Date(),
  selectedDate: new Date(),
  onChangeDate: () => null,
  onChangeView: () => null,
};

describe('ButtonAction', () => {
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

  it('Should sink in the button MonthView', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('button[id="__HeaderButtonView_Button-MonthView_Id"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });

  it('Should sink in the button HeaderTitle', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('button[id="__HeaderButtonTitle_Id"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });

  it('Should sink in the button WeekView', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('button[id="__HeaderButtonView_Button-WeekView_Id"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });

  it('Should sink in the button DayView', () => {
    const themedComponent = mountWithTheme(<Component {...defaultProps} />);

    const btns = themedComponent.find('button[id="__HeaderButtonView_Button-DayView_Id"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
