import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { DayOfWeek, DateRangeType } from '@fluentui/react';
import { MonthPicker as Component } from 'src/components/inputs/MonthPicker/index';
import { Container } from './MonthPicker.styles';
import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';

const baseProps = {
  onSelect: () => null,
  show: true,
};

const defaultProps = {
  open: false,
  onSelect: () => null,
  showDates: false,
  isMonthPickerVisible: true,
  dateRangeType: DateRangeType.Month,
  autoNavigateOnSelection: true,
  showGoToToday: true,
  showNavigateButtons: true,
  highlightCurrentMonth: true,
  highlightSelectedMonth: true,
  isDayPickerVisible: false,
  showMonthPickerAsOverlay: true,
  showWeekNumbers: false,
  firstDayOfWeek: DayOfWeek.Monday,
  show: true,
};

const theme = {
  colors: {
    themePrimary: '#fff',
  },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic MonthPicker Component', () => {
  it('Should renders MonthPicker with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('open')).toBeFalsy();
    expect(wrapper.prop('showDates')).toBeFalsy();
    expect(wrapper.prop('isMonthPickerVisible')).toBeFalsy();
    expect(wrapper.children().at(0).prop('showGoToToday')).toBeTruthy();
    expect(wrapper.children().at(0).prop('showWeekNumbers')).toBeFalsy();
    expect(wrapper.children().at(0).prop('firstDayOfWeek')).toBeTruthy();
  });

  it('Test styled Container component', () => {
    const baseTree = shallowWithTheme(
      <Container {...defaultProps} theme={theme}>
        <div/>
      </Container>
    );
    expect(baseTree).toMatchSnapshot();
  });

  it('Test styled MonthPicker component', () => {
    const wrapper = shallow(<Component {...defaultProps} restrictedDates={[new Date()]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Test default props MonthPicker component', () => {
    const wrapper = shallow(<Component {...baseProps} restrictedDates={[new Date()]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Match Snapshot sending showDates property', () => {
    const wrapper = shallow(<Component {...defaultProps} showDates />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Match Snapshot sending minDate property', () => {
    const wrapper = shallow(<Component {...defaultProps} minDate={new Date()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Press a calendar day calls onSelect', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithTheme(<Component {...defaultProps} onSelect={mockFn} />);

    const nextMonth = wrapper.find('#MonthPickerModal i[data-icon-name="Down"]');
    expect(nextMonth.length).toBe(1);
    nextMonth.simulate('click');

    const thirdDay = wrapper.find('#MonthPickerModal table tr td button').at(12);
    expect(thirdDay.length).toBe(1);
    thirdDay.simulate('click');

    expect(mockFn).toBeCalled();
  });

  it('Test press the Previous button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goBackButton = wrapper.find('button[data-testid="__PrevioustBtn"]');
    goBackButton.simulate('click');
    expect(goBackButton.length).toBe(1);
  });

  it('Test press the Next button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goNextButton = wrapper.find('button[data-testid="__NextBtn"]');
    goNextButton.simulate('click');
    expect(goNextButton.length).toBe(1);
  });

  it('Match Snapshot sending showDates property', () => {
    const wrapper = shallow(<Component {...defaultProps} showDates />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Match Snapshot sending minDate property', () => {
    const wrapper = shallow(<Component {...defaultProps} minDate={new Date()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Test press the Previous button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goBackButton = wrapper.find('button[data-testid="__PrevioustBtn"]');
    goBackButton.simulate('click');
    expect(goBackButton.length).toBe(1);
  });

  it('Test press the Next button in the MonthPicker', () => {
    const wrapper = mountWithTheme(<Component {...defaultProps} />);
    const goNextButton = wrapper.find('button[data-testid="__NextBtn"]');
    goNextButton.simulate('click');
    expect(goNextButton.length).toBe(1);
  });
});
