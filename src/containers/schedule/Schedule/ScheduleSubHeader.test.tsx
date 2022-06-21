import { mountWithTheme } from 'src/utils/testUtils';
import { ScheduleSubHeader } from './ScheduleSubHeader';

const defaultProps = {
  id: '__SubHeader',
  currentView: 'month',
  currentDate: new Date(2022, 5, 21),
  selectedDate: new Date(2022, 5, 21),
  onChangeDate: jest.fn(),
  onChangeView: jest.fn(),
};

describe('Schedule Subheader Test...', () => {

  it('Month View', () => {
    const wrapper = mountWithTheme(<ScheduleSubHeader {...defaultProps} />);

    expect(wrapper.find('div[id^="__WeekSubHeader"]')).toHaveLength(0);

    expect(wrapper.find('span[id="__MonthSubHeader_0"]').text()).toEqual('Sunday');
    expect(wrapper.find('span[id="__MonthSubHeader_1"]').text()).toEqual('Monday');
    expect(wrapper.find('span[id="__MonthSubHeader_2"]').text()).toEqual('Tuesday');
    expect(wrapper.find('span[id="__MonthSubHeader_3"]').text()).toEqual('Wednesday');
    expect(wrapper.find('span[id="__MonthSubHeader_4"]').text()).toEqual('Thursday');
    expect(wrapper.find('span[id="__MonthSubHeader_5"]').text()).toEqual('Friday');
    expect(wrapper.find('span[id="__MonthSubHeader_6"]').text()).toEqual('Saturday');
  });

  it('Week View', () => {
    const onChangeDate = jest.fn();
    const onChangeView = jest.fn();

    const wrapper = mountWithTheme(
      <ScheduleSubHeader {...defaultProps} currentView="week" onChangeView={onChangeView} onChangeDate={onChangeDate}/>
    );

    expect(wrapper.find('span[id^="__MonthSubHeader"]')).toHaveLength(0);

    expect(wrapper.find('div[id="__WeekSubHeader_0"]').text()).toEqual('19Sun');
    expect(wrapper.find('div[id="__WeekSubHeader_1"]').text()).toEqual('20Mon');
    expect(wrapper.find('div[id="__WeekSubHeader_2"]').text()).toEqual('Jun 21Tue');
    expect(wrapper.find('div[id="__WeekSubHeader_3"]').text()).toEqual('22Wed');
    expect(wrapper.find('div[id="__WeekSubHeader_4"]').text()).toEqual('23Thu');
    expect(wrapper.find('div[id="__WeekSubHeader_5"]').text()).toEqual('24Fri');
    expect(wrapper.find('div[id="__WeekSubHeader_6"]').text()).toEqual('25Sat');

    wrapper.find('div[id="__WeekSubHeader_1"]').simulate('click');
    expect(onChangeDate).toBeCalled();
    expect(onChangeView).toBeCalled();
  });

  it('Day View', () => {
    const wrapper = mountWithTheme(<ScheduleSubHeader {...defaultProps} currentView="day" />);

    expect(wrapper.find('div[id="__SubHeader"]').text()).toEqual('Jun 21Tue');
  });

});
