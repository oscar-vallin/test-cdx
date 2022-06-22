import { mountWithTheme } from 'src/utils/testUtils';
import { ScheduleHeader } from './ScheduleHeader';

const onChangeView = jest.fn();

const defaultProps = {
  id: '',
  currentView: 'month',
  currentDate: new Date(),
  selectedDate: new Date(),
  onChangeView,
};

const MONTH_BUTTON = 'Button[id="__HeaderButtonView_Button-MonthView_Id"]';
const MONTH_TITLE_BUTTON = 'Button[id="__MonthButtonTitle_Id"]';
const WEEK_BUTTON = 'Button[id="__HeaderButtonView_Button-WeekView_Id"]';
const WEEK_TITLE_BUTTON = 'Button[id="__WeekButtonTitle_Id"]';
const DAY_BUTTON = 'Button[id="__HeaderButtonView_Button-DayView_Id"]';
const DAY_TITLE_BUTTON = 'Button[id="__DayButtonTitle_Id"]';

const MONTH_PICKER = 'MonthPicker';
const TODAY_BUTTON = 'ButtonAction[id="__Today_Button"]';
const PREV_MONTH_BUTTON = 'ButtonAction[id="ButtonUp"]';
const NEXT_MONTH_BUTTON = 'ButtonAction[id="ButtonDown"]';
const PREV_WEEK_BUTTON = 'ButtonAction[id="ButtonPrev"]';
const NEXT_WEEK_BUTTON = 'ButtonAction[id="ButtonNext"]';
const PREV_DAY_BUTTON = 'ButtonAction[id="ButtonPrev"]';
const NEXT_DAY_BUTTON = 'ButtonAction[id="ButtonNext"]';

describe('ButtonAction', () => {
  it('Month View', () => {
    const onChangeDate = jest.fn();

    const wrapper = mountWithTheme(<ScheduleHeader {...defaultProps} onChangeDate={onChangeDate} />);

    // Month button should be selected
    expect(wrapper.find(MONTH_BUTTON).props().selected).toEqual(true);
    expect(wrapper.find(WEEK_BUTTON).props().selected).toEqual(false);
    expect(wrapper.find(DAY_BUTTON).props().selected).toEqual(false);

    expect(wrapper.find(MONTH_TITLE_BUTTON)).toHaveLength(1);
    expect(wrapper.find(WEEK_TITLE_BUTTON)).toHaveLength(0);
    expect(wrapper.find(DAY_TITLE_BUTTON)).toHaveLength(0);

    wrapper.find(PREV_MONTH_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(1);
    wrapper.find(NEXT_MONTH_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(2);

    // Clicking the month title button should show a month picker
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(0);
    wrapper.find(MONTH_TITLE_BUTTON).simulate('click');
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(1);

    wrapper.find(MONTH_BUTTON).simulate('click');
    expect(onChangeView).toHaveBeenCalledTimes(0);
    wrapper.find(WEEK_BUTTON).simulate('click');
    expect(onChangeView).toHaveBeenCalled();
  });

  it('Week View', () => {
    const onChangeDate = jest.fn();

    const wrapper = mountWithTheme(<ScheduleHeader {...defaultProps} currentView="week" onChangeDate={onChangeDate} />);

    wrapper.find(WEEK_BUTTON).simulate('click');
    expect(wrapper.find(MONTH_BUTTON).props().selected).toEqual(false);
    expect(wrapper.find(WEEK_BUTTON).props().selected).toEqual(true);
    expect(wrapper.find(DAY_BUTTON).props().selected).toEqual(false);

    expect(wrapper.find(MONTH_TITLE_BUTTON)).toHaveLength(0);
    expect(wrapper.find(WEEK_TITLE_BUTTON)).toHaveLength(1);
    expect(wrapper.find(DAY_TITLE_BUTTON)).toHaveLength(0);

    wrapper.find(PREV_WEEK_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(1);
    wrapper.find(NEXT_WEEK_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(2);

    // Clicking the week title button should show a month picker
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(0);
    wrapper.find(WEEK_TITLE_BUTTON).simulate('click');
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(1);
  });

  it('Day View', () => {
    const onChangeDate = jest.fn();

    const wrapper = mountWithTheme(<ScheduleHeader {...defaultProps} currentView="day" onChangeDate={onChangeDate} />);

    wrapper.find(DAY_BUTTON).simulate('click');
    expect(wrapper.find(MONTH_BUTTON).props().selected).toEqual(false);
    expect(wrapper.find(WEEK_BUTTON).props().selected).toEqual(false);
    expect(wrapper.find(DAY_BUTTON).props().selected).toEqual(true);

    expect(wrapper.find(MONTH_TITLE_BUTTON)).toHaveLength(0);
    expect(wrapper.find(WEEK_TITLE_BUTTON)).toHaveLength(0);
    expect(wrapper.find(DAY_TITLE_BUTTON)).toHaveLength(1);

    wrapper.find(PREV_DAY_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(1);
    wrapper.find(NEXT_DAY_BUTTON).simulate('click');
    expect(onChangeDate).toHaveBeenCalledTimes(2);

    // Clicking the week title button should show a month picker
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(0);
    wrapper.find(DAY_TITLE_BUTTON).simulate('click');
    expect(wrapper.find(MONTH_PICKER)).toHaveLength(1);
  });

  it('Today Button', () => {
    const onChangeDate = jest.fn();

    const wrapper = mountWithTheme(<ScheduleHeader {...defaultProps} onChangeDate={onChangeDate} />);

    expect(onChangeDate).not.toBeCalled();
    wrapper.find(TODAY_BUTTON).simulate('click');
    expect(onChangeDate).toBeCalled();
  });
});
